
import { uploadOnCloudinary, deleteFromCloudinary } from "../cloudinary.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User, { FCMDevice } from "../models/User.js";
import { UserRole } from "../models/userRole.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendSMS from "../utils/sms.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import mongoose from "mongoose";
import { Specialty } from "../models/Master.js";
import { tailorWelcomeEmail } from "../utils/emails/welEmail.js";
import { sendEmail } from "../utils/emails/sendEmail.js";
import Customer from "../models/Customer.js";


//generate access and refreshtoken
const generateAccessAndRefereshTokens = async (userId, roleId) => {
  try {
    console.log("userId passed:", userId, typeof userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId passed to generateAccessAndRefereshTokens");
    }

    // Choose model based on role
    const Model = roleId === 3 ? Customer : User;

    const user = await Model.findById(userId);
    if (!user) throw new Error("User not found");

    // Use model methods if they exist (for User)
    const accessToken = user.generateAccessToken?.() || jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = user.generateRefreshToken?.() || jwt.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Something went wrong while generating refresh and access token");
  }
};




//checkEmail
const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(new ApiError(400, "Email is required"));
  }

  const user = await User.findOne({ email }).populate("user_role").lean();

  if (
    !user ||
    (user?.user_role?.role_id !== 1 && user?.user_role?.role_id !== 6)
  ) {
    return res.status(400).json(new ApiError(400, "User does not exist"));
  }

  const roleId = user?.user_role?.role_id;

  return res
    .status(200)
    .json(new ApiResponse(200, roleId, "User data fetched successfully"));
});


//authController.js

const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log("User Register Req.body:", req.body);
    console.log("User Register Req.files:", req.files);

    let {
      email,
      user_role,
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

    // -------------------------------
    // Parse JSON from FormData safely
    // -------------------------------
    try {
      specialties = specialties ? JSON.parse(specialties) : [];
      locations = locations ? JSON.parse(locations) : [];
      socialMedia = socialMedia ? JSON.parse(socialMedia) : {};
    } catch (parseErr) {
      throw new ApiError(400, "Invalid JSON format in specialties, locations, or socialMedia");
    }

    if (!email || !user_role) throw new ApiError(400, "Email and user_role are required");

    // -------------------------------
    // Check if user already exists
    // -------------------------------
    const existedUser = await User.findOne({ email });
    if (existedUser) throw new ApiError(400, "User with this email already exists");

    // -------------------------------
    // Validate user role
    // -------------------------------
    const userRole = await UserRole.findOne({ role_id: user_role });
    if (!userRole) throw new ApiError(400, "Invalid user role");

    // -------------------------------
    // Handle file uploads to Cloudinary
    // -------------------------------
    const files = req.files || {};

    const uploadFiles = async (fileArray) => {
      if (!fileArray) return [];
      const uploadPromises = fileArray.map((file) => uploadOnCloudinary(file.path));
      const results = await Promise.all(uploadPromises);
      return results.filter((r) => r).map((r) => r.secure_url);
    };

    const [emiratesId, tradeLicense, certificates, portfolioImages] = await Promise.all([
      uploadFiles(files.emiratesId),
      uploadFiles(files.tradeLicense),
      uploadFiles(files.certificates),
      uploadFiles(files.portfolioImages),
    ]);

    // -------------------------------
    // Validate specialties
    // -------------------------------
    let specialtiesData = [];
    if (specialties.length > 0) {
      const validSpecialties = await Specialty.find({ _id: { $in: specialties } });
      specialtiesData = validSpecialties.map((s) => ({ _id: s._id, name: s.name }));
    }

    // -------------------------------
    // Build user payload
    // -------------------------------
    let userPayload = {
      email,
      user_role: userRole._id,
      ownerName,
      businessName,
      country,
      password: password || "",
      status: userRole.name === "customer" ? "Approved" : "Pending",
    };

    if (user_role == 2) {
      userPayload.tailorInfo = {
        businessInfo: { businessName, ownerName, whatsapp, locations },
        professionalInfo: { gender, specialties: specialtiesData, experience, description },
        services: { homeMeasurement, rushOrders },
        documents: { emiratesId, tradeLicense, certificates, portfolioImages },
        emiratesIdExpiry,
        additionalInfo: { socialMedia },
        submittedAt: new Date(),
        status: "pending",
      };
    }

    // Admin-created tailor auto-approve
    if (req.user?.user_role?.role_id === 1 || req.user?.user_role?.role_id === 6) {
      userPayload.status = "Approved";
      if (user_role == 2 && userPayload.tailorInfo) {
        userPayload.tailorInfo.status = "approved";
      }
    }

    // -------------------------------
    // Save User
    // -------------------------------
    const user = await User.create(userPayload);

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -user_role -otp -otp_time"
    );

    // -------------------------------
    // Send Welcome Email to Tailors
    // -------------------------------
    if (user_role == 2) {
      try {
        await sendEmail(
          email,
          "Welcome to Tailor Platform – Next Steps",
          tailorWelcomeEmail(ownerName, businessName)
        );
      } catch (mailErr) {
        console.error("Error sending tailor welcome email:", mailErr);
      }
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (err) {
    console.error("Error in registerUser:", err);

    if (err.name === "ValidationError") return res.status(400).json(new ApiError(400, err.message));
    if (err.code === 11000) {
      const dupField = Object.keys(err.keyPattern || {})[0];
      return res.status(400).json(new ApiError(400, `${dupField} must be unique`));
    }
    if (err.name === "CastError") return res.status(400).json(new ApiError(400, `Invalid ${err.path}: ${err.value}`));

    return res
      .status(err.statusCode || 500)
      .json(new ApiError(err.statusCode || 500, err.message || "Internal Server Error"));
  }
});




// loginUser
// const loginUser = asyncHandler(async (req, res) => {
//   try {
   
//     const { emailOrPhone, password, provider } = req.body;

//     const requiredFields = {
//       emailOrPhone,
//     };

//     const missingFields = Object.keys(requiredFields).filter(
//       (field) => !requiredFields[field] || requiredFields[field] === "undefined"
//     );

//     if (missingFields.length > 0) {
//       return res
//         .status(400)
//         .json(
//           new ApiError(
//             400,
//             `Missing required field: ${missingFields.join(", ")}`
//           )
//         );
//     }

//     let user;
//     if (!provider) {
//       if (emailOrPhone.includes("@")) {
//         user = await User.findOne({ email: emailOrPhone }).populate(
//           "user_role"
//         );
        
//         if (!user)
//           return res.status(400).json(new ApiError(400, "Email not found!"));
//       } else {
//         user = await User.findOne({ phone_number: emailOrPhone }).populate(
//           "user_role"
//         );
       
//         if (!user)
//           return res
//             .status(400)
//             .json(new ApiError(400, "Phone number not found!"));
//       }

//       const isPasswordValid = await user.isPasswordCorrect(password);

//       if (!isPasswordValid) {
//         return res
//           .status(401)
//           .json(new ApiError(401, "Invalid user credentials"));
//       }
//     } else {
//       if (emailOrPhone.includes("@")) {
//         user = await User.findOne({
//           email: emailOrPhone,
//         }).populate("user_role");
       
//       } else {
//         user = await User.findOne({
//           phone_number: emailOrPhone,
//         }).populate("user_role");
         
//       }
//     }

//     if (
//       !user ||
//       !user.user_role ||
//       user.user_role.role_id !== Number(req.params.role_id)
//     ) {
//       return res.status(404).json(new ApiError(404, "User does not exist"));
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
//       user._id
//     );

//     const loggedInUser = await User.findById(user._id)
//       .select("-password -refreshToken -otp -otp_time")
//       .populate("user_role")
//       .populate("country")
//       .populate("city");

//     const options = { httpOnly: true, secure: true };

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           { user: loggedInUser,  accessToken, refreshToken },
//           "User logged In Successfully"
//         )
//       );
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json(new ApiError(500, "Internal Server Error"));
//   }
// });

//login for both tailor and customer

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { emailOrPhone, password, provider } = req.body;
    const requestedRoleId = Number(req.params.role_id);
    console.log("req:",req.body)
    if (!emailOrPhone) {
      return res.status(400).json(new ApiError(400, "Missing required field: emailOrPhone"));
    }

    // Choose model based on role
    const Model = requestedRoleId === 3 ? Customer : User;

    let user;
    const phoneField = requestedRoleId === 3 ? "contactNumber" : "phone_number";

    if (!provider) {
      // Normal login
      if (emailOrPhone.includes("@")) {
        user = await Model.findOne({ email: emailOrPhone }).populate("user_role");
        if (!user) return res.status(400).json(new ApiError(400, "Email not found!"));
      } else {
        user = await Model.findOne({ [phoneField]: emailOrPhone }).populate("user_role");
        if (!user) return res.status(400).json(new ApiError(400, "Phone number not found!"));
      }

      // Password check
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid) return res.status(401).json(new ApiError(401, "Invalid user credentials"));
    } else {
      // Provider login
      if (emailOrPhone.includes("@")) {
        user = await Model.findOne({ email: emailOrPhone }).populate("user_role");
      } else {
        user = await Model.findOne({ [phoneField]: emailOrPhone }).populate("user_role");
      }
    }

    // Validate role: allow role_id 1 (admin) to log in as any role
    if (!user || !user.user_role) {
      return res.status(404).json(new ApiError(404, "User does not exist"));
    }

    const actualRoleId = user.user_role.role_id;
    if (actualRoleId !== 1 && actualRoleId !== requestedRoleId) {
      return res.status(404).json(new ApiError(404, "User does not exist or role mismatch"));
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id, actualRoleId);

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
        new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")
      );
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});



//logoutuser
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});


//refreshaccesstoken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(420).json(new ApiError(420, "Unauthorized request"));
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Determine roleId from token or from request if you store it in token
    const roleId = decodedToken?.roleId || 1; // fallback to 1 (User) if not present
    const Model = roleId === 3 ? Customer : User;

    const user = await Model.findById(decodedToken?._id);

    if (!user) {
      return res.status(420).json(new ApiError(420, "Invalid refresh token"));
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(420).json(new ApiError(420, "Refresh token is expired or used"));
    }

    const options = { httpOnly: true, secure: true };

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id, roleId);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
  } catch (error) {
    return res.status(420).json(new ApiError(420, error?.message || "Invalid refresh token"));
  }
});



//changecurrentpassword
const changeCurrentPassword = asyncHandler(async (req, res) => {
  console.log("change password Req.body", req.body);
  const { oldPassword, newPassword } = req.body;

  const requiredFields = {
    oldPassword,
    newPassword,
  };

  const missingFields = Object.keys(requiredFields).filter(
    (field) => !requiredFields[field] || requiredFields[field] === "undefined"
  );

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json(
        new ApiError(400, `Missing required field: ${missingFields.join(", ")}`)
      );
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Invalid old password"));
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});


//getcurrentUser
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});


//updateaccountdetails
const updateAccountDetails = asyncHandler(async (req, res) => {
  console.log("user update Req.body", req.body);
  console.log("user update Req.file", req.file);
  const {
    email,
    first_name,
    last_name,
    owner_name,
    phone_number,
    dob,
    address,
    gender,
    location,
  } = req.body;
  const imageLocalPath = req.file?.path;

  const existingUser = await User.findById(req.user?._id);
  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  let image = existingUser.profile_image;
  if (imageLocalPath) {
    try {
      const [deleteResult, uploadResult] = await Promise.all([
        existingUser.profile_image
          ? deleteFromCloudinary(existingUser.profile_image)
          : Promise.resolve(),
        uploadOnCloudinary(imageLocalPath),
      ]);
      if (!uploadResult?.url) {
        return res
          .status(400)
          .json(new ApiError(400, "Error while uploading image"));
      }
      image = uploadResult.url;
    } catch (error) {
      return res.status(500).json(new ApiError(500, "Image handling failed"));
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        email,
        first_name,
        last_name,
        owner_name,
        phone_number,
        address,
        dob,
        gender,
        profile_image: image,
        location,
      },
    },
    { new: true }
  ).select("-password -refreshToken -user_role -otp -otp_time");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});


//updatecoverimage
const updateCoverImage = asyncHandler(async (req, res) => {
  const imageLocalPath = req.file?.path;

  const existingUser = await User.findById(req.user?._id);
  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  let image = existingUser.cover_image;
  if (imageLocalPath) {
    try {
      const [deleteResult, uploadResult] = await Promise.all([
        existingUser.cover_image
          ? deleteFromCloudinary(existingUser.cover_image)
          : Promise.resolve(),
        uploadOnCloudinary(imageLocalPath),
      ]);
      if (!uploadResult?.url) {
        return res
          .status(400)
          .json(new ApiError(400, "Error while uploading image"));
      }
      image = uploadResult.url;
    } catch (error) {
      return res.status(500).json(new ApiError(500, "Image handling failed"));
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        cover_image: image,
      },
    },
    { new: true }
  ).select("-password -refreshToken -user_role -otp -otp_time");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});


//genrateotp
const generateOTP = asyncHandler(async (req, res) => {
  console.log("generate otp Req.body", req.body);
  const { emailOrPhone } = req.body;

  if (!emailOrPhone) {
    return res
      .status(400)
      .json(new ApiError(400, "email or phone is required"));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  console.log("otp", otp);

  let user;
  if (emailOrPhone.includes("@")) {
    user = await User.findOne({ email: emailOrPhone });
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    user.otp = otpHash;
    user.otp_time = new Date();
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Forgot Password OTP",
      text: `Dear User, Your Forgot Password OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  } else {
    user = await User.findOne({ phone_number: emailOrPhone });
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    user.otp = otpHash;
    user.otp_time = new Date();
    await user.save();

    sendSMS(
      9691060747,
      `Dear User, Your OTP is: ${otp} Valid For 5 Minutes Only`
    );
  }

  return res.status(200).json(new ApiResponse(200, "OTP sent successfully"));
});


//verifyOtp
const verifyOTP = asyncHandler(async (req, res) => {
  console.log("verify otp Req.body", req.body);
  const { emailOrPhone, otp } = req.body;

  if (!emailOrPhone || !otp) {
    return res.status(400).json(new ApiError(400, "email and otp is required"));
  }

  let user;
  if (emailOrPhone.includes("@")) {
    user = await User.findOne({ email: emailOrPhone });
  } else {
    user = await User.findOne({ phone_number: emailOrPhone });
  }

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    return res.status(400).json(new ApiError(400, "Invalid OTP"));
  }

  const expirationTime = 5 * 60 * 1000;
  if (new Date() - new Date(user.otp_time) > expirationTime) {
    return res.status(400).json(new ApiError(400, "OTP Expired"));
  }
  return res.status(200).json(new ApiResponse(200, "OTP verified"));
});


//resetpassword
const resetPassword = asyncHandler(async (req, res) => {
  console.log("reset password Req.body", req.body);
  const { emailOrPhone, newPassword } = req.body;

  if (!emailOrPhone || !newPassword) {
    return res
      .status(400)
      .json(new ApiError(400, "email and new password is required"));
  }

  let user;
  if (emailOrPhone.includes("@")) {
    user = await User.findOne({ email: emailOrPhone });
  } else {
    user = await User.findOne({ phone_number: emailOrPhone });
  }

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});


//createFCMtoken
const createFCMToken = asyncHandler(async (req, res) => {
  console.log("Req.body -----", req.body);
  const { user_id, fcm_token, device_type, device_id } = req.body;

  const requiredFields = {
    user_id,
    fcm_token,
    device_type,
    ...(device_type !== "web" && { device_id }),
  };

  const missingFields = Object.keys(requiredFields).filter(
    (field) => !requiredFields[field] || requiredFields[field] === "undefined"
  );

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json(
        new ApiError(400, `Missing required field: ${missingFields.join(", ")}`)
      );
  }

  try {
    const query = { user_id, device_type };
    if (device_type !== "web") {
      query.device_id = device_id;
    } else {
      query.fcm_token = fcm_token;
    }

    const existingDevice = await FCMDevice.findOne(query);

    if (existingDevice) {
      existingDevice.fcm_token = fcm_token;
      await existingDevice.save();
      return res
        .status(201)
        .json(new ApiResponse(200, "FCM token created successfully"));
    } else {
      const newDevice = await FCMDevice.create({
        user_id,
        fcm_token,
        device_type,
        device_id,
      });
      console.log("Created Token -----", newDevice);
      return res
        .status(201)
        .json(new ApiResponse(200, "FCM token created successfully"));
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateCoverImage,
  generateOTP,
  verifyOTP,
  resetPassword,
  createFCMToken,
  checkEmail,
};
