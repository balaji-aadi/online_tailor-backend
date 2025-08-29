import Dispute from '../models/Dispute.js';
import nodemailer from 'nodemailer';
import * as analyticsService from '../services/analyticsService.js';
import * as notificationService from '../services/notificationService.js';
import csv from 'csvtojson';
import XLSX from 'xlsx';
import logger from '../utils/logger.js';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import  User  from '../models/User.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { UserRole } from '../models/userRole.js';
import { sendEmail } from '../utils/emails/sendEmail.js';


// List users with optional role filter, search, pagination
const getAllUsers = asyncHandler(async (req, res) => {
  const {
    role,
    status,
    gender,
    city,
    search = "",
    page = "1",
    limit = "20",
    sort = "desc",
  } = req.query;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  // Fetch roles once
  const [adminRole, tailorRole, customerRole] = await Promise.all([
    UserRole.findOne({ role_id: 1 }),
    UserRole.findOne({ role_id: 2 }),
    UserRole.findOne({ role_id: 3 }),
  ]);

  // Ensure ObjectId
const adminRoleId = adminRole?._id ? new mongoose.Types.ObjectId(adminRole._id) : null;
const tailorRoleId = tailorRole?._id ? new mongoose.Types.ObjectId(tailorRole._id) : null;
const customerRoleId = customerRole?._id ? new mongoose.Types.ObjectId(customerRole._id) : null;

if (city) query.city = new mongoose.Types.ObjectId(city);

  // Build query
  const query = {};
  if (adminRoleId) query.user_role = { $ne: adminRoleId };
  if (role === "tailor" && tailorRoleId) query.user_role = tailorRoleId;
  if (role === "customer" && customerRoleId) query.user_role = customerRoleId;
  if (status && ["pending", "approved", "rejected"].includes(status.toLowerCase()))
    query["tailorInfo.status"] = status.toLowerCase();
  if (gender && ["male", "female", "others"].includes(gender.toLowerCase()))
    query["tailorInfo.professionalInfo.gender"] = gender.toLowerCase();
  if (city) query.city = mongoose.Types.ObjectId(city);
  if (search) {
    const regex = new RegExp(search, "i");
    query.$or = [
      { email: regex },
      { first_name: regex },
      { last_name: regex },
      { ownerName: regex },
      { businessName: regex },
      { phone_number: regex },
    ];
  }

  // Fetch users
  const users = await User.find(query)
    .populate("user_role country city")
    .select("-otp -otp_time -password -refreshToken")
    .populate("tailorInfo.professionalInfo.specialties")
    .sort({ _id: sort === "asc" ? 1 : -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  // Fetch counts
  const totalUsers = await User.countDocuments({ user_role: { $ne: adminRoleId } });
  const totalTailors = await User.countDocuments({ user_role: tailorRoleId });
  const totalCustomers = await User.countDocuments({ user_role: customerRoleId });
  const pendingTailors = await User.countDocuments({
    user_role: tailorRoleId,
    "tailorInfo.status": "pending",
  });
  const approvedTailors = await User.countDocuments({
    user_role: tailorRoleId,
    "tailorInfo.status": "approved",
  });
  const rejectedTailors = await User.countDocuments({
    user_role: tailorRoleId,
    "tailorInfo.status": "rejected",
  });

  res.status(200).json(
    new ApiResponse(200, users, `${role ? role : "Users"} fetched successfully`, {
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalUsers / limitNum),
      totalUsers,
      totalTailors,
      totalCustomers,
      pendingTailors,
      approvedTailors,
      rejectedTailors,
    })
  );
});





// User verification and approval workflows
const verifyUser = async (req, res, next) => {
  try {
    const { userId, documents } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isVerified = true;
    user.verifiedAt = new Date();
    user.documents = documents;
    await user.save();

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    next(error);
  }
};

const approveUser = async (req, res, next) => {
  try {
    const { userId, approvalStatus } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = approvalStatus;
    user.approvedAt = approvalStatus ? new Date() : null;
    await user.save();

    res.status(200).json({ message: `User ${approvalStatus ? 'approved' : 'disapproved'} successfully` });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { roles } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: 'Roles must be a non-empty array' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.auditTrail.push({
      action: 'Role update',
      by: req.user._id,
      previousRoles: user.roles,
      newRoles: roles,
      timestamp: new Date(),
    });
    user.roles = roles;

    await user.save();

    res.status(200).json({ message: 'User roles updated successfully' });
  } catch (error) {
    next(error);
  }
};

const bulkImportUsers = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const file = req.files[0];
    let usersData = [];

    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      usersData = await csv().fromFile(file.path);
    } else if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.originalname.endsWith('.xlsx')
    ) {
      const workbook = XLSX.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      usersData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } else {
      return res.status(400).json({ message: 'Unsupported file format' });
    }

    const userDocs = usersData.map((user) => ({
      email: user.email,
      password: user.password || null,
      roles: user.roles ? user.roles.split(',') : ['customer'],
      isVerified: false,
      isApproved: false,
    }));

    await User.insertMany(userDocs);
    fs.unlinkSync(file.path);

    res.status(201).json({ message: `${userDocs.length} users imported successfully` });
  } catch (error) {
    next(error);
  }
};

const bulkExportUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('email roles isVerified isApproved createdAt').lean();
    const headers = 'email,roles,isVerified,isApproved,createdAt\n';
    const csvRows = users
      .map(
        (user) =>
          `${user.email},"${user.roles.join('|')}",${user.isVerified},${user.isApproved},${user.createdAt.toISOString()}`
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv');
    res.send(headers + csvRows);
  } catch (error) {
    next(error);
  }
};

const broadcastNotifications = async (req, res, next) => {
  try {
    const { message, type, targetUserIds } = req.body;

    let users;
    if (targetUserIds && targetUserIds.length > 0) {
      users = await User.find({ _id: { $in: targetUserIds } }).select('_id email').lean();
    } else {
      users = await User.find().select('_id email').lean();
    }

    const notifications = users.map((u) => ({
      userId: u._id,
      type,
      message,
      read: false,
      scheduledAt: null,
      deliveryAttempts: 0,
    }));

    await Notification.insertMany(notifications);
    notificationService.sendBulkNotifications(notifications).catch((err) => logger.error(err));

    res.status(200).json({ message: 'Broadcast notifications queued for delivery' });
  } catch (error) {
    next(error);
  }
};

const blacklistUser = async (req, res, next) => {
  try {
    const { userId, reason, expiryDate } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.blacklist = {
      isBlacklisted: true,
      reason,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
    };
    await user.save();

    res.status(200).json({ message: 'User blacklisted successfully' });
  } catch (error) {
    next(error);
  }
};

const whitelistUser = async (req, res, next) => {
  try {
    const { userId, reason, expiryDate } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.whitelist = {
      isWhitelisted: true,
      reason,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
    };
    await user.save();

    res.status(200).json({ message: 'User whitelisted successfully' });
  } catch (error) {
    next(error);
  }
};

// const getWhiteLabelConfig = async (req, res, next) => {
//   try {
//     const config = await Content.findOne({ type: 'whitelabel' }).lean();
//     res.json(config || {});
//   } catch (error) {
//     next(error);
//   }
// };

// const updateWhiteLabelConfig = async (req, res, next) => {
//   try {
//     const { config } = req.body;
//     let existingConfig = await Content.findOne({ type: 'whitelabel' });

//     if (!existingConfig) {
//       existingConfig = new Content({
//         type: 'whitelabel',
//         body: config,
//         language: 'en',
//         updatedAt: new Date(),
//       });
//     } else {
//       existingConfig.body = config;
//       existingConfig.updatedAt = new Date();
//     }

//     await existingConfig.save();
//     res.status(200).json({ message: 'White-label config updated successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

const getRealTimeMetrics = async (req, res, next) => {
  try {
    const metrics = await analyticsService.getRealTimeMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
};

const getGeographicDistribution = async (req, res, next) => {
  try {
    const geoDist = await analyticsService.getGeographicDistribution();
    res.json(geoDist);
  } catch (error) {
    next(error);
  }
};

const getBusinessIntelligence = async (req, res, next) => {
  try {
    const biData = await analyticsService.getBusinessIntelligence();
    res.json(biData);
  } catch (error) {
    next(error);
  }
};

const initiateDispute = async (req, res, next) => {
  try {
    const { orderId, evidence, description } = req.body;
    const dispute = await Dispute.create({
      orderId,
      status: 'open',
      evidence,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      communicationChannel: [],
    });

    res.status(201).json({ message: 'Dispute initiated', disputeId: dispute._id });
  } catch (error) {
    next(error);
  }
};

const mediateDispute = async (req, res, next) => {
  try {
    const { disputeId } = req.params;
    const { resolution, communication } = req.body;
    const dispute = await Dispute.findById(disputeId);
    if (!dispute) return res.status(404).json({ message: 'Dispute not found' });

    dispute.status = resolution.status || dispute.status;
    dispute.resolutionDetails = resolution.details || dispute.resolutionDetails;
    if (communication) dispute.communicationChannel.push(communication);
    dispute.updatedAt = new Date();

    await dispute.save();
    res.json({ message: 'Dispute updated', dispute });
  } catch (error) {
    next(error);
  }
};

const getDisputeDetails = async (req, res, next) => {
  try {
    const { disputeId } = req.params;
    const dispute = await Dispute.findById(disputeId).lean();
    if (!dispute) return res.status(404).json({ message: 'Dispute not found' });

    res.json(dispute);
  } catch (error) {
    next(error);
  }
};

// const listContent = async (req, res, next) => {
//   try {
//     const { language, type } = req.query;
//     const filter = {};
//     if (language) filter.language = language;
//     if (type) filter.type = type;

//     const contents = await Content.find(filter).lean();
//     res.json(contents);
//   } catch (error) {
//     next(error);
//   }
// };

// const createContent = async (req, res, next) => {
//   try {
//     const { language, type, body, seo, complianceFlags } = req.body;
//     const content = new Content({
//       language,
//       type,
//       body,
//       seo,
//       complianceFlags,
//       updatedAt: new Date(),
//     });

//     await content.save();
//     res.status(201).json({ message: 'Content created', content });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateContent = async (req, res, next) => {
//   try {
//     const { contentId } = req.params;
//     const { language, type, body, seo, complianceFlags } = req.body;
//     const content = await Content.findById(contentId);
//     if (!content) return res.status(404).json({ message: 'Content not found' });

//     content.language = language || content.language;
//     content.type = type || content.type;
//     content.body = body || content.body;
//     content.seo = seo || content.seo;
//     content.complianceFlags = complianceFlags || content.complianceFlags;
//     content.updatedAt = new Date();

//     await content.save();
//     res.json({ message: 'Content updated', content });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteContent = async (req, res, next) => {
//   try {
//     const { contentId } = req.params;
//     await Content.findByIdAndDelete(contentId);
//     res.json({ message: 'Content deleted' });
//   } catch (error) {
//     next(error); 
//   }
// };


const verifyTailorAccount = async (req, res, next) => {
  try {
    const { 
      userId, 
      action = "approve", 
      generateTempPassword = false, 
      reason = ""   // ✅ Unified field for both reject & activate
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId).populate("user_role");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.user_role || !(user.user_role.role_id === 2 || /tailor/i.test(user.user_role.name || ""))) {
      return res.status(400).json({ message: "User is not a tailor" });
    }

    if (!user.email) {
      return res.status(400).json({ message: "User does not have a valid email" });
    }

    user.tailorInfo = user.tailorInfo || {};
    let tempPassword = null;
    let emailSubject = "";
    let emailHtml = "";

    switch (action) {
      case "approve":
        if (user.tailorInfo.status !== "pending") {
          return res.status(400).json({ message: "Cannot approve a non-pending tailor" });
        }
        user.tailorInfo.status = "approved";
        user.status = "Approved";

        if (generateTempPassword || !user.password) {
          tempPassword = Math.random().toString(36).slice(-10) + "A1!";
          user.password = tempPassword;
        }

        emailSubject = "Your Tailor Account is Verified";
        emailHtml = `
          <p>Dear Tailor,</p>
          <p>Your account has been <strong>verified and approved</strong>. You can now sign in.</p>
          <p><strong>Login ID:</strong> ${user.email}</p>
          ${
            tempPassword
              ? `<p><strong>Temporary Password:</strong> ${tempPassword}</p>
                 <p>Please change your password after logging in.</p>`
              : `<p>Use your existing password to log in.</p>`
          }
          <p>Thank you for joining our platform!</p>
        `;
        break;

      case "reject":
        if (user.tailorInfo.status !== "pending") {
          return res.status(400).json({ message: "Cannot reject a non-pending tailor" });
        }
        user.tailorInfo.status = "rejected";
        user.status = "Rejected";
        user.tailorInfo.reason = reason || "No reason provided"; // ✅

        emailSubject = "Your Tailor Account Has Been Rejected";
        emailHtml = `
          <p>Dear Tailor,</p>
          <p>We regret to inform you that your account has been <strong>rejected</strong>.</p>
          <p><strong>Reason:</strong> ${user.tailorInfo.reason}</p>
          <p>If you have any questions, please contact support.</p>
        `;
        break;

      case "deactivate":
        if (user.tailorInfo.status !== "approved") {
          return res.status(400).json({ message: "Only approved tailors can be deactivated" });
        }
        user.tailorInfo.status = "deactivated";
        user.status = "Deactivated";

        emailSubject = "Your Tailor Account Has Been Deactivated";
        emailHtml = `
          <p>Dear Tailor,</p>
          <p>Your account has been <strong>deactivated</strong> by the admin.</p>
          <p>If you have any questions, please contact support.</p>
        `;
        break;

      case "activate":
        if (user.tailorInfo.status !== "deactivated") {
          return res.status(400).json({ message: "Only deactivated tailors can be activated" });
        }
        user.tailorInfo.status = "approved";
        user.status = "Approved";
        user.tailorInfo.reason = reason || "No reason provided"; // ✅

        emailSubject = "Your Tailor Account Has Been Reactivated";
        emailHtml = `
          <p>Dear Tailor,</p>
          <p>Your account has been <strong>reactivated</strong>. You may now log in again.</p>
          <p><strong>Reason:</strong> ${user.tailorInfo.reason}</p>
          <p>Thank you for being with us.</p>
        `;
        break;

      default:
        return res.status(400).json({ message: "Invalid action. Must be 'approve', 'reject', 'deactivate', or 'activate'." });
    }

    await user.save();
    await sendEmail(user.email, emailSubject, emailHtml);

    return res.status(200).json({
      message: `Tailor ${action} successfully and notified`,
      userId: user._id,
      action,
      reason: user.tailorInfo.reason || null, // ✅ Single key in response
      tempPassword: tempPassword || null,
    });
  } catch (error) {
    console.error("Error verifying/rejecting/deactivating/activating tailor account:", error);
    return next(error);
  }
};







// Export at bottom
// New (ESM)
export {
  getAllUsers,
  verifyTailorAccount,
  verifyUser,
  approveUser,
  updateUserRole,
  bulkImportUsers,
  bulkExportUsers,
  broadcastNotifications,
  blacklistUser,
  whitelistUser,
  // getWhiteLabelConfig,
  // updateWhiteLabelConfig,
  getRealTimeMetrics,
  getGeographicDistribution,
  getBusinessIntelligence,
  initiateDispute,
  mediateDispute,
  getDisputeDetails
};




