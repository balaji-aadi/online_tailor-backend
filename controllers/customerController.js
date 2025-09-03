import TailorProfile from "../models/TailorProfile.js";
import Review from "../models/Review.js";
import logger from "../utils/logger.js";
import crypto from "crypto";
import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserRole } from "../models/userRole.js";
import User from "../models/User.js";
import { Service } from "../models/Service.js";
import ReadymadeCloth from "../models/readymadeCloth.js";
import { Order, ReadymadeOrder } from "../models/Order.js";

const loginCustomer = asyncHandler(async (req, res) => {
  try {
    const { emailOrPhone, password, provider } = req.body;
    const requestedRoleId = Number(req.params.role_id);
    console.log("loginCustomer req.body:", req.body);

    if (!emailOrPhone) {
      return res
        .status(400)
        .json(new ApiError(400, "Missing required field: emailOrPhone"));
    }

    // Choose model based on role
    const Model = requestedRoleId === 3 ? Customer : User;
    const phoneField = requestedRoleId === 3 ? "contactNumber" : "phone_number";

    let user;

    if (!provider) {
      // Normal login
      if (emailOrPhone.includes("@")) {
        user = await Model.findOne({ email: emailOrPhone }).populate(
          "user_role"
        );
        if (!user)
          return res.status(400).json(new ApiError(400, "Email not found!"));
      } else {
        user = await Model.findOne({ [phoneField]: emailOrPhone }).populate(
          "user_role"
        );
        if (!user)
          return res
            .status(400)
            .json(new ApiError(400, "Phone number not found!"));
      }

      // Password check
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid)
        return res
          .status(401)
          .json(new ApiError(401, "Invalid user credentials"));
    } else {
      // Provider login
      if (emailOrPhone.includes("@")) {
        user = await Model.findOne({ email: emailOrPhone }).populate(
          "user_role"
        );
      } else {
        user = await Model.findOne({ [phoneField]: emailOrPhone }).populate(
          "user_role"
        );
      }
    }

    // Validate role: allow role_id 1 (admin) to log in as any role
    if (!user || !user.user_role) {
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    const actualRoleId = user.user_role.role_id;
    if (actualRoleId !== 1 && actualRoleId !== requestedRoleId) {
      return res
        .status(404)
        .json(new ApiError(404, "User does not exist or role mismatch"));
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id,
      actualRoleId
    );

    // Remove sensitive info
    const loggedInUser = await Model.findById(user._id)
      .select("-password -refreshToken -otp -otp_time")
      .populate("user_role")
      .populate("country")
      .populate("city");

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.error("Error during customer login:", error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

const registerCustomer = asyncHandler(async (req, res) => {
  let {
    name,
    contactNumber,
    email,
    password,
    dob,
    address,
    city,
    gender,
    age,
    location, // expecting { coordinates: [lng, lat] } from frontend
  } = req.body;

  // ✅ Validate required fields
  if (!name || !contactNumber || !email || !password) {
    throw new ApiError(
      400,
      "Name, contactNumber, password and email are required"
    );
  }

  // ✅ Check if email already exists
  const existed = await Customer.findOne({ email });
  if (existed) {
    throw new ApiError(400, "Customer with this email already exists");
  }

  // ✅ Find user role with role_id = 3
  const userRole = await UserRole.findOne({ role_id: 3 });
  if (!userRole) {
    throw new ApiError(400, "Customer role not found in UserRole collection");
  }

  // ✅ Handle profile picture upload
  let profilePictureUrl = null;
  if (req.files?.profilePicture) {
    const upload = await uploadOnCloudinary(req.files.profilePicture[0].path);
    profilePictureUrl = upload?.secure_url;
  }

  // ✅ Handle multiple Emirates ID proof images
  let emiratesIdProofUrls = [];
  if (req.files?.emiratesIdProof && req.files.emiratesIdProof.length > 0) {
    const uploads = await Promise.all(
      req.files.emiratesIdProof.map(async (file) => {
        const result = await uploadOnCloudinary(file.path);
        return result?.secure_url;
      })
    );
    emiratesIdProofUrls = uploads.filter((url) => url !== null);
  }

  // ✅ Parse location if sent as JSON string
  let parsedLocation = null;
  if (location) {
    parsedLocation =
      typeof location === "string" ? JSON.parse(location) : location;
    // Ensure coordinates array exists
    if (
      !parsedLocation.coordinates ||
      parsedLocation.coordinates.length !== 2
    ) {
      parsedLocation = null;
    }
  }

  // ✅ Create customer
  const customer = await Customer.create({
    user_role: userRole._id,
    name,
    contactNumber,
    email,
    password: password || "",
    dob,
    address,
    city,
    gender,
    age,
    profilePicture: profilePictureUrl,
    emiratesIdProof: emiratesIdProofUrls,
    status: "Approved",
    location: parsedLocation || { type: "Point", coordinates: [0, 0] },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, customer, "Customer registered successfully"));
});

// ---------------- Update Customer ----------------
const updateCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid customerId"));
  }

  let customer = await Customer.findById(customerId);
  if (!customer)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Customer not found"));

  const {
    name,
    contactNumber,
    email,
    dob,
    address,
    city,
    gender,
    age,
    status, // only admin can change status
    location, // coordinates update
  } = req.body;

  if (name) customer.name = name;
  if (contactNumber) customer.contactNumber = contactNumber;
  if (email) customer.email = email;
  if (dob) customer.dob = dob;
  if (address) customer.address = address;
  if (city) customer.city = city;
  if (gender) customer.gender = gender;
  if (age) customer.age = age;

  if (status && req.user?.user_role?.role_id === 1) {
    // only admin
    customer.status = status; // "Deactivated" or "Approved"
  }

  // Handle profile picture update
  if (req.files?.profilePicture) {
    if (customer.profilePicture)
      await deleteFromCloudinary([customer.profilePicture]);
    const upload = await uploadOnCloudinary(req.files.profilePicture[0].path);
    customer.profilePicture = upload?.secure_url;
  }

  // Handle coordinates update
  if (location) {
    const parsedLocation =
      typeof location === "string" ? JSON.parse(location) : location;
    if (
      parsedLocation &&
      parsedLocation.coordinates &&
      parsedLocation.coordinates.length === 2
    ) {
      customer.location = parsedLocation;
    }
  }

  await customer.save();
  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer updated successfully"));
});

// ---------------- Delete Customer ----------------
const deleteCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid customerId"));
  }

  const customer = await Customer.findById(customerId);
  if (!customer)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Customer not found"));

  // Delete profile picture & documents from Cloudinary
  if (customer.profilePicture)
    await deleteFromCloudinary([customer.profilePicture]);
  if (customer.emiratesId) await deleteFromCloudinary([customer.emiratesId]);

  await Customer.deleteOne({ _id: customerId });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Customer deleted successfully"));
});

const updateCustomerMeasurements = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid customerId"));
  }

  const customer = await Customer.findById(customerId);
  if (!customer)
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Customer not found"));

  const measurements = req.body; // { height, weight, chest, waist, hips, ... }

  customer.measurements = {
    ...customer.measurements?.toObject(),
    ...measurements,
  };

  await customer.save();
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        customer.measurements,
        "Measurements updated successfully"
      )
    );
});

// Get logged-in customer profile
const getLoggedInCustomer = asyncHandler(async (req, res) => {
  try {
    const customerId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid customerId"));
    }

    const customer = await Customer.findById(customerId)
      .select("-password -refreshToken -otp -otp_time")
      .populate("user_role")
      .populate("city");

    if (!customer) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Customer not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, customer, "Customer profile fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching logged-in customer:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
});

// Get customer profile by query id
const getCustomerById = asyncHandler(async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "Invalid or missing customerId in query")
        );
    }

    const customer = await Customer.findById(customerId)
      .select("-password -refreshToken -otp -otp_time")
      .populate("user_role")
      .populate("city");

    if (!customer) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Customer not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, customer, "Customer profile fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
});

// =========================
// Tailor Discovery & Recommendations
// =========================
const searchTailors = async (req, res, next) => {
  try {
    const { location, preferences } = req.body;
    const tailors = await TailorProfile.find({
      "gpsAddress.coordinates": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          },
          $maxDistance: 50000,
        },
      },
      specializations: { $in: preferences.specializations || [] },
    })
      .limit(20)
      .lean();

    res.json({ results: tailors });
  } catch (error) {
    next(error);
  }
};

const getRecommendations = async (req, res, next) => {
  try {
    const topTailors = await TailorProfile.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "userId",
          foreignField: "tailorId",
          as: "reviews",
        },
      },
      { $addFields: { avgReview: { $avg: "$reviews.qualityRating" } } },
      { $sort: { avgReview: -1 } },
      { $limit: 10 },
    ]);
    res.json(topTailors);
  } catch (error) {
    next(error);
  }
};

const getEventsCalendar = async (req, res, next) => {
  res.json({ message: "Events calendar - to be implemented" });
};

// =========================
// Orders
// =========================
// const placeOrder = async (req, res, next) => {
//   try {
//     const {
//       tailorId,
//       orderDetails,
//       measurements,
//       paymentMethod,
//       customizations,
//       deliveryAddress,
//     } = req.body;

//     const order = new Order({
//       customerId: req.user._id,
//       tailorId,
//       intakeChannel: "mobile_app",
//       classification: orderDetails.classification,
//       lifecycleStatus: {
//         current: "pending",
//         timestamps: { pending: new Date() },
//       },
//       orderDetails,
//       measurements,
//       customizations,
//       deliveryAddress,
//       createdAt: new Date(),
//     });

//     await order.save();
//     res
//       .status(201)
//       .json({ message: "Order placed successfully", orderId: order._id });
//   } catch (error) {
//     next(error);
//   }
// };

const getOrderTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid orderId" });
    }
    const order = await Order.findOne({
      _id: orderId,
      customerId: req.user._id,
    }).lean();
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({
      lifecycleStatus: order.lifecycleStatus,
      photos: order.progressPhotos || [],
    });
  } catch (error) {
    next(error);
  }
};

const getOrderHistory = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const makePayment = async (req, res, next) => {
  res.json({ message: "Payment processing - to be implemented" });
};

const getOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      _id: orderId,
      customerId: req.user._id,
    }).lean();
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ status: order.lifecycleStatus.current });
  } catch (error) {
    next(error);
  }
};

const uploadProgressPhoto = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!req.file)
      return res.status(400).json({ message: "No photo uploaded" });

    const order = await Order.findOne({
      _id: orderId,
      customerId: req.user._id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.progressPhotos = order.progressPhotos || [];
    order.progressPhotos.push({
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date(),
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    await order.save();

    res.status(201).json({
      message: "Progress photo uploaded",
      progressPhotos: order.progressPhotos,
    });
  } catch (error) {
    next(error);
  }
};

// =========================
// Profile
// =========================
const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      email: user.email,
      roles: user.roles,
      contact: user.contact,
      notificationPreferences: user.notificationPreferences,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { contact, notificationPreferences } = req.body;
    const user = req.user;

    if (contact) user.contact = contact;
    if (notificationPreferences)
      user.notificationPreferences = notificationPreferences;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

const listFamilyProfiles = async (req, res, next) => {
  res.json([]); // placeholder
};

const createFamilyProfile = async (req, res, next) => {
  res
    .status(201)
    .json({ message: "Create family profile - to be implemented" });
};

// =========================
// Reviews
// =========================
const submitReview = async (req, res, next) => {
  try {
    const { tailorId, ratings, reviewText, photos, isVerifiedPurchase } =
      req.body;

    const review = await new Review({
      customerId: req.user._id,
      tailorId,
      ratings,
      reviewText,
      photos: photos || [],
      isVerifiedPurchase: !!isVerifiedPurchase,
      moderationStatus: "pending",
      createdAt: new Date(),
    }).save();

    res.status(201).json({
      message: "Review submitted and pending moderation",
      reviewId: review._id,
    });
  } catch (error) {
    next(error);
  }
};

const listReviews = async (req, res, next) => {
  try {
    const { tailorId } = req.params;
    const reviews = await Review.find({
      tailorId,
      moderationStatus: "approved",
    }).lean();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const reportReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.communityReports = review.communityReports || [];
    review.communityReports.push({
      userId: req.user._id,
      reason,
      reportedAt: new Date(),
    });
    await review.save();

    res.json({ message: "Review reported for moderation" });
  } catch (error) {
    next(error);
  }
};

// =========================
// Referrals & Social
// =========================
const getReferralStatus = async (req, res, next) => {
  res.json({ message: "Referral status - to be implemented" });
};

const sendReferralInvite = async (req, res, next) => {
  res.json({ message: "Send referral invite - to be implemented" });
};

const shareOnSocialMedia = async (req, res, next) => {
  res.json({ message: "Social media sharing - to be implemented" });
};

const orderReadymadeCloth = asyncHandler(async (req, res) => {
  const { ReadymadeClothId, address, finalPrice } = req.body;
  console.log("user:", req.user);

  // ✅ Validate inputs
  if (!ReadymadeClothId || !address || !finalPrice) {
    throw new ApiError(
      400,
      "ReadymadeClothId, address, and finalPrice are required"
    );
  }

  // ✅ Get customer from req.user.id
  const customer = await Customer.findById(req.user._id);
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  // ✅ Check if cloth exists
  const cloth = await ReadymadeCloth.findById(ReadymadeClothId);
  if (!cloth) {
    throw new ApiError(404, "Readymade cloth not found");
  }

  // ✅ Create new order
  const newOrder = await ReadymadeOrder.create({
    customer: {
      id: customer._id,
      name: customer.name,
      address, // take delivery address from req.body
    },
    readymadeCloth: cloth._id,
    tailorId: cloth.tailorId,
    finalPrice,
    status: "Pending",
  });

  res.status(201).json(
    new ApiResponse(201, newOrder, "Readymade cloth order placed successfully")
  );
});



const getAllReadymadeOrders = asyncHandler(async (req, res) => {
  const { userId, tailorId, clothId, status } = req.body;

  const filter = {};

  if (userId) filter["customer.id"] = userId;
  if (tailorId) filter.tailorId = tailorId;
  if (clothId) filter.readymadeCloth = clothId;
  if (status) filter.status = status;

  const orders = await ReadymadeOrder.find(filter)
    .populate("readymadeCloth")
    .populate("customer.id", "name email contactNumber")
    .populate("tailorId", "ownerName businessName email");

  res
    .status(200)
    .json(
      new ApiResponse(200, orders, "Readymade orders fetched successfully")
    );
});

const getMyReadymadeOrders = asyncHandler(async (req, res) => {
  const customerId = req.user?._id || req.user?.id;

  if (!customerId) {
    throw new ApiError(401, "Unauthorized: customerId not found in request");
  }

  const orders = await ReadymadeOrder.find({ "customer.id": customerId })
    .populate("readymadeCloth")
    .populate("tailorId", "ownerName businessName email");

  res
    .status(200)
    .json(
      new ApiResponse(200, orders, "Your readymade orders fetched successfully")
    );
});

const placeOrder = asyncHandler(async (req, res) => {
  const { service_id, deliveryOption, additionalNotes } = req.body;
  const customerId = req.user._id; // assuming auth middleware sets req.user

  // ✅ Validate required fields
  if (!service_id) {
    throw new ApiError(400, "Service ID is required to place an order");
  }

  // ✅ Fetch customer
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  // ✅ Fetch service
  const service = await Service.findById(service_id);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  // ✅ Calculate price based on delivery option
  let price = service.basePrice;
  if (deliveryOption === "express" && service.expressPrice)
    price = service.expressPrice;
  if (deliveryOption === "preference" && service.preferencePrice)
    price = service.preferencePrice;

  // ✅ Create order
  const order = await Order.create({
    service: service._id,
    tailor: service.tailorId,
    customer: customer._id,
    customerName: customer.name,
    customerAddress: customer.address,
    price,
    deliveryOption: deliveryOption || "regular",
    additionalNotes,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});

const getCustomerOrders = asyncHandler(async (req, res) => {
  const customerId = req.user._id;

  const orders = await Order.find({ customer: customerId })
    .populate("service")
    .populate("tailor", "ownerName businessName")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Customer orders fetched successfully"));
});

const getAllOrders = asyncHandler(async (req, res) => {
  const { tailorId, customerId, serviceId } = req.body;

  // Build dynamic query
  const query = {};
  if (tailorId) query.tailor = tailorId;
  if (customerId) query.customer = customerId;
  if (serviceId) query.service = serviceId;

  const orders = await Order.find(query)
    .populate("service")
    .populate("tailor", "ownerName businessName email")
    .populate("customer", "name email contactNumber address")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders,
        orders.length
          ? "Orders fetched successfully"
          : "No orders found for the given filter"
      )
    );
});

// =========================
// Exports
// =========================
export {
  getAllOrders,
  getCustomerOrders,
  placeOrder,

  orderReadymadeCloth,
  getAllReadymadeOrders,
  getMyReadymadeOrders,

  loginCustomer,
  getCustomerById,
  getLoggedInCustomer,
  registerCustomer,
  updateCustomer,
  deleteCustomer,
  updateCustomerMeasurements,
  searchTailors,
  getRecommendations,
  getEventsCalendar,
  getOrderTracking,
  getOrderHistory,
  makePayment,
  getOrderStatus,
  uploadProgressPhoto,
  getProfile,
  updateProfile,
  listFamilyProfiles,
  createFamilyProfile,
  submitReview,
  listReviews,
  reportReview,
  getReferralStatus,
  sendReferralInvite,
  shareOnSocialMedia,
};
