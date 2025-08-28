import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import TailorProfile from "../models/TailorProfile.js";
import Order from "../models/Order.js";
import fs from "fs";
import path from "path";

// ✅ Get Tailor Profile
const getProfile = asyncHandler(async (req, res) => {
  const profile = await TailorProfile.findOne({ userId: req.user._id }).lean();
  if (!profile) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Profile not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

// ✅ Update Tailor Profile
const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;

  let profile = await TailorProfile.findOne({ userId: req.user._id });
  if (!profile) {
    profile = new TailorProfile({ userId: req.user._id });
  }

  Object.assign(profile, updates, { updatedAt: new Date() });
  await profile.save();

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile updated successfully"));
});

// ✅ Upload Portfolio
const uploadPortfolio = asyncHandler(async (req, res) => {
  if (!req.files?.length) {
    throw new ApiError(400, "No portfolio images uploaded");
  }

  const profile = await TailorProfile.findOne({ userId: req.user._id });
  if (!profile) throw new ApiError(404, "Profile not found");

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

  return res.status(201).json(
    new ApiResponse(
      201,
      profile.multimediaPortfolio,
      `${req.files.length} portfolio images uploaded`
    )
  );
});

// ✅ List Portfolio
const listPortfolio = asyncHandler(async (req, res) => {
  const profile = await TailorProfile.findOne({ userId: req.user._id }).lean();
  if (!profile) throw new ApiError(404, "Profile not found");

  return res
    .status(200)
    .json(new ApiResponse(200, profile.multimediaPortfolio || [], "Portfolio fetched"));
});

// ✅ Delete Portfolio File
const deletePortfolioFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const profile = await TailorProfile.findOne({ userId: req.user._id });
  if (!profile) throw new ApiError(404, "Profile not found");

  const fileIndex = profile.multimediaPortfolio.findIndex(
    (file) => file._id.toString() === fileId
  );
  if (fileIndex === -1) throw new ApiError(404, "Portfolio file not found");

  const fileToDelete = profile.multimediaPortfolio[fileIndex];
  profile.multimediaPortfolio.splice(fileIndex, 1);
  await profile.save();

  const filePath = path.join(
    process.cwd(),
    "uploads",
    path.basename(fileToDelete.url)
  );
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Portfolio file deleted successfully"));
});

// ✅ List Orders
const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ tailorId: req.user._id }).lean();
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// ✅ Get Order Details
const getOrderDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId, tailorId: req.user._id }).lean();

  if (!order) throw new ApiError(404, "Order not found");

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order details fetched"));
});

// ✅ Update Order Status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const allowedStatuses = ["pending", "in_progress", "qc_check", "completed", "cancelled"];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
  if (!order) throw new ApiError(404, "Order not found");

  order.lifecycleStatus.current = status;
  order.lifecycleStatus.timestamps[status] = new Date();
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated"));
});

// ✅ Mark Rush Order
const markRushOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId, tailorId: req.user._id });
  if (!order) throw new ApiError(404, "Order not found");

  order.rushOrder = true;
  order.rushPricingMultiplier = 1.5;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order marked as rush order"));
});

// ✅ Order Tracking
const getOrderTracking = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId, tailorId: req.user._id }).lean();
  if (!order) throw new ApiError(404, "Order not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      { lifecycleStatus: order.lifecycleStatus, deliveryCoordination: order.deliveryCoordination },
      "Order tracking details fetched"
    )
  );
});

export {
  getProfile,
  updateProfile,
  uploadPortfolio,
  listPortfolio,
  deletePortfolioFile,
  listOrders,
  getOrderDetails,
  updateOrderStatus,
  markRushOrder,
  getOrderTracking,
};
