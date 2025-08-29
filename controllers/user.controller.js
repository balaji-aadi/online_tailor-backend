import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import TailorProfile from "../models/TailorProfile.js";
import Order from "../models/Order.js";
import fs from "fs";
import path from "path";
import User from "../models/User.js";
import mongoose from "mongoose";
import { deleteFromCloudinary, uploadOnCloudinary } from "../cloudinary.js";

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid userId"));
  }

  // Fetch user
  const user = await User.findById(userId)
    .populate("user_role country city tailorInfo.professionalInfo.specialties")
    .select("-password -refreshToken -otp -otp_time");

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

const updateUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid userId"));
  }

  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  let {
    email,
    ownerName,
    businessName,
    country,
    password,
    whatsapp,
    locations,
    gender,
    specialties,
    experience,
    description,
    homeMeasurement,
    rushOrders,
    emiratesIdExpiry,
    socialMedia,
  } = req.body;

  // Parse JSON safely
  try {
    specialties = specialties ? JSON.parse(specialties) : [];
    locations = locations ? JSON.parse(locations) : [];
    socialMedia = socialMedia ? JSON.parse(socialMedia) : {};
  } catch (parseErr) {
    throw new ApiError(
      400,
      "Invalid JSON format in specialties, locations, or socialMedia"
    );
  }

  // Update fields
  if (email) user.email = email;
  if (ownerName) user.ownerName = ownerName;
  if (businessName) user.businessName = businessName;
  if (country) user.country = country;
  if (password) user.password = password;

  // Tailor-specific updates
  if (
    user.user_role &&
    (user.user_role.role_id === 2 || /tailor/i.test(user.user_role.name || ""))
  ) {
    user.tailorInfo = user.tailorInfo || {};
    user.tailorInfo.businessInfo = user.tailorInfo.businessInfo || {};
    user.tailorInfo.professionalInfo = user.tailorInfo.professionalInfo || {};
    user.tailorInfo.services = user.tailorInfo.services || {};
    user.tailorInfo.documents = user.tailorInfo.documents || {};
    user.tailorInfo.additionalInfo = user.tailorInfo.additionalInfo || {
      socialMedia: {},
    };

    if (ownerName) user.tailorInfo.businessInfo.ownerName = ownerName;
    if (businessName) user.tailorInfo.businessInfo.businessName = businessName;
    if (whatsapp) user.tailorInfo.businessInfo.whatsapp = whatsapp;
    if (locations.length) user.tailorInfo.businessInfo.locations = locations;
    if (gender) user.tailorInfo.professionalInfo.gender = gender;
    if (specialties.length) {
      const validSpecialties = await Specialty.find({
        _id: { $in: specialties },
      });
      user.tailorInfo.professionalInfo.specialties = validSpecialties.map(
        (s) => ({ _id: s._id, name: s.name })
      );
    }
    if (experience) user.tailorInfo.professionalInfo.experience = experience;
    if (description) user.tailorInfo.professionalInfo.description = description;
    if (homeMeasurement !== undefined)
      user.tailorInfo.services.homeMeasurement = homeMeasurement;
    if (rushOrders !== undefined)
      user.tailorInfo.services.rushOrders = rushOrders;
    if (emiratesIdExpiry) user.tailorInfo.emiratesIdExpiry = emiratesIdExpiry;
    if (socialMedia) user.tailorInfo.additionalInfo.socialMedia = socialMedia;

    // Handle document uploads via Cloudinary
    const files = req.files || {};
    const uploadFiles = async (fileArray, oldFiles = []) => {
      if (!fileArray) return oldFiles;
      const uploadPromises = fileArray.map((file) =>
        uploadOnCloudinary(file.path)
      );
      const results = await Promise.all(uploadPromises);
      return results.filter((r) => r).map((r) => r.secure_url);
    };

    user.tailorInfo.documents.emiratesId = await uploadFiles(
      files.emiratesId,
      user.tailorInfo.documents.emiratesId
    );
    user.tailorInfo.documents.tradeLicense = await uploadFiles(
      files.tradeLicense,
      user.tailorInfo.documents.tradeLicense
    );
    user.tailorInfo.documents.certificates = await uploadFiles(
      files.certificates,
      user.tailorInfo.documents.certificates
    );
    user.tailorInfo.documents.portfolioImages = await uploadFiles(
      files.portfolioImages,
      user.tailorInfo.documents.portfolioImages
    );
  }

  await user.save();

  const updatedUser = await User.findById(userId)
    .populate("user_role country city tailorInfo.professionalInfo.specialties")
    .select("-password -refreshToken -otp -otp_time");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid userId"));
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  // Delete documents from Cloudinary
  if (user.tailorInfo?.documents) {
    const { emiratesId, tradeLicense, certificates, portfolioImages } =
      user.tailorInfo.documents;
    await Promise.all([
      deleteFromCloudinary(emiratesId),
      deleteFromCloudinary(tradeLicense),
      deleteFromCloudinary(certificates),
      deleteFromCloudinary(portfolioImages),
    ]);
  }

  await User.deleteOne({ _id: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});

export { getUserById, updateUserById, deleteUserById };