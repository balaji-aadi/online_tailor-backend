const TailorProfile = require('../models/TailorProfile');
const Order = require('../models/Order');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Profile management
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await TailorProfile.findOne({ userId: req.user._id }).lean();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const {
      businessLicenseInfo,
      gpsAddress,
      contact,
      specializations,
      certifications,
      operatingHours,
      serviceCatalog,
      capacityLimits,
      availabilityCalendar,
      insuranceInfo,
      warrantyInfo,
    } = req.body;

    let profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) {
      profile = new TailorProfile({ userId: req.user._id });
    }

    profile.businessLicenseInfo = businessLicenseInfo || profile.businessLicenseInfo;
    profile.gpsAddress = gpsAddress || profile.gpsAddress;
    profile.contact = contact || profile.contact;
    profile.operatingHours = operatingHours || profile.operatingHours;
    profile.specializations = specializations || profile.specializations;
    profile.certifications = certifications || profile.certifications;
    profile.serviceCatalog = serviceCatalog || profile.serviceCatalog;
    profile.capacityLimits = capacityLimits || profile.capacityLimits;
    profile.availabilityCalendar = availabilityCalendar || profile.availabilityCalendar;
    profile.insuranceInfo = insuranceInfo || profile.insuranceInfo;
    profile.warrantyInfo = warrantyInfo || profile.warrantyInfo;
    profile.updatedAt = new Date();

    await profile.save();

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    next(error);
  }
};

// Portfolio management
exports.uploadPortfolio = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: 'No portfolio images uploaded' });

    const profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    req.files.forEach((file) => {
      profile.multimediaPortfolio.push({
        url: `/uploads/${file.filename}`,
        filename: file.originalname,
        filetype: file.mimetype,
        size: file.size,
        uploadedAt: new Date(),
      });
    });

    await profile.save();

    res.status(201).json({ message: `${req.files.length} portfolio images uploaded`, portfolio: profile.multimediaPortfolio });
  } catch (error) {
    next(error);
  }
};

exports.listPortfolio = async (req, res, next) => {
  try {
    const profile = await TailorProfile.findOne({ userId: req.user._id }).lean();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile.multimediaPortfolio || []);
  } catch (error) {
    next(error);
  }
};

exports.deletePortfolioFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const fileIndex = profile.multimediaPortfolio.findIndex((file) => file._id.toString() === fileId);
    if (fileIndex === -1) return res.status(404).json({ message: 'Portfolio file not found' });

    const fileToDelete = profile.multimediaPortfolio[fileIndex];
    profile.multimediaPortfolio.splice(fileIndex, 1);
    await profile.save();

    // Delete file physically from uploads folder, if stored locally
    const filePath = path.join(__dirname, '..', 'uploads', path.basename(fileToDelete.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Portfolio file deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Specializations management
exports.addSpecialization = async (req, res, next) => {
  try {
    const { specialization } = req.body;
    if (!specialization) return res.status(400).json({ message: 'Specialization is required' });

    const profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    if (!profile.specializations.includes(specialization)) {
      profile.specializations.push(specialization);
      await profile.save();
    }

    res.status(201).json({ message: 'Specialization added', specializations: profile.specializations });
  } catch (error) {
    next(error);
  }
};

exports.removeSpecialization = async (req, res, next) => {
  try {
    const { specializationId } = req.params;
    if (!specializationId) return res.status(400).json({ message: 'Specialization ID is required' });

    const profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.specializations = profile.specializations.filter((sp) => sp.toString() !== specializationId);
    await profile.save();

    res.json({ message: 'Specialization removed', specializations: profile.specializations });
  } catch (error) {
    next(error);
  }
};

// Certifications management
exports.uploadCertifications = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No certification documents uploaded' });

    const profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    req.files.forEach((file) => {
      profile.certificationDocuments.push({
        url: `/uploads/${file.filename}`,
        filename: file.originalname,
        filetype: file.mimetype,
        size: file.size,
        uploadedAt: new Date(),
      });
    });

    await profile.save();

    res.status(201).json({ message: `${req.files.length} certification documents uploaded`, certifications: profile.certificationDocuments });
  } catch (error) {
    next(error);
  }
};

exports.listCertifications = async (req, res, next) => {
  try {
    const profile = await TailorProfile.findOne({ userId: req.user._id }).lean();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile.certificationDocuments || []);
  } catch (error) {
    next(error);
  }
};

exports.deleteCertification = async (req, res, next) => {
  try {
    const { certificationId } = req.params;
    const profile = await TailorProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const certIndex = profile.certificationDocuments.findIndex((doc) => doc._id.toString() === certificationId);
    if (certIndex === -1) return res.status(404).json({ message: 'Certification document not found' });

    const docToDelete = profile.certificationDocuments[certIndex];
    profile.certificationDocuments.splice(certIndex, 1);
    await profile.save();

    const filePath = path.join(__dirname, '..', 'uploads', path.basename(docToDelete.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Certification document deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Orders management
exports.listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ tailorId: req.user._id }).lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, tailorId: req.user._id }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const allowedStatuses = ['pending', 'in_progress', 'qc_check', 'completed', 'cancelled'];

    if (!allowedStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.lifecycleStatus.current = status;
    order.lifecycleStatus.timestamps[status] = new Date();

    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    next(error);
  }
};

exports.batchProcessOrders = async (req, res, next) => {
  try {
    const { orderIds, action } = req.body;
    if (!Array.isArray(orderIds) || orderIds.length === 0) return res.status(400).json({ message: 'orderIds required' });

    const validActions = ['start', 'pause', 'complete'];
    if (!validActions.includes(action)) return res.status(400).json({ message: 'Invalid action' });

    const orders = await Order.find({ _id: { $in: orderIds }, tailorId: req.user._id });
    if (!orders.length) return res.status(404).json({ message: 'Orders not found' });

    for (const order of orders) {
      switch (action) {
        case 'start':
          order.lifecycleStatus.current = 'in_progress';
          break;
        case 'pause':
          order.lifecycleStatus.current = 'paused';
          break;
        case 'complete':
          order.lifecycleStatus.current = 'completed';
          order.lifecycleStatus.timestamps.completed = new Date();
          break;
      }
      await order.save();
    }

    res.json({ message: `Batch action '${action}' applied to ${orders.length} orders` });
  } catch (error) {
    next(error);
  }
};

exports.uploadQCPhotos = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No QC photos uploaded' });

    const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    req.files.forEach((file) => {
      order.qcCheckpoints.push({
        photoUrl: `/uploads/${file.filename}`,
        metadata: {
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          uploadedAt: new Date(),
        },
      });
    });

    await order.save();

    res.status(201).json({ message: `${req.files.length} QC photos uploaded`, qcCheckpoints: order.qcCheckpoints });
  } catch (error) {
    next(error);
  }
};

exports.markRushOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.rushOrder = true;
    order.rushPricingMultiplier = 1.5;
    await order.save();

    res.json({ message: 'Order marked as rush order', order });
  } catch (error) {
    next(error);
  }
};

exports.updatePartialDelivery = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { partialDeliveries } = req.body; // array of items with delivery info

    if (!Array.isArray(partialDeliveries)) return res.status(400).json({ message: 'partialDeliveries must be an array' });

    const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.partialDeliveries = partialDeliveries;
    await order.save();

    res.json({ message: 'Partial delivery updated', partialDeliveries: order.partialDeliveries });
  } catch (error) {
    next(error);
  }
};

exports.getOrderTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, tailorId: req.user._id }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ lifecycleStatus: order.lifecycleStatus, deliveryCoordination: order.deliveryCoordination });
  } catch (error) {
    next(error);
  }
};

// Customer interaction facilitation
exports.listChats = async (req, res, next) => {
  // Dummy placeholder for listing chat conversations
  res.json({ message: 'List chat conversations - to be implemented' });
};

exports.sendMessage = async (req, res, next) => {
  // Placeholder for sending chat message linked with tailor
  res.json({ message: 'Send message - to be implemented' });
};

exports.scheduleAppointment = async (req, res, next) => {
  // Placeholder for appointment scheduling integration
  res.json({ message: 'Schedule appointment - to be implemented' });
};

exports.listAppointments = async (req, res, next) => {
  // Placeholder for listing appointments
  res.json({ message: 'List appointments - to be implemented' });
};

exports.sharePhotoNote = async (req, res, next) => {
  // Placeholder for photo note sharing
  res.json({ message: 'Share photo note - to be implemented' });
};

exports.shareVoiceNote = async (req, res, next) => {
  // Placeholder for voice note sharing
  res.json({ message: 'Share voice note - to be implemented' });
};

// Financial data handling
exports.getRevenueTracking = async (req, res, next) => {
  // Placeholder for revenue tracking dashboard data
  res.json({ message: 'Revenue tracking - to be implemented' });
};

exports.getCommissionDetails = async (req, res, next) => {
  // Placeholder for commission calculations
  res.json({ message: 'Commission details - to be implemented' });
};

exports.generateInvoice = async (req, res, next) => {
  // Placeholder for invoice generation with VAT compliance
  res.json({ message: 'Generate invoice - to be implemented' });
};

exports.getFinancialAnalytics = async (req, res, next) => {
  // Placeholder for financial analytics
  res.json({ message: 'Financial analytics - to be implemented' });
};
