// authMiddleware.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Verify JWT already exists
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id)
      .select("-password -refreshToken -otp -otp_time")
      .populate("user_role")
      .populate("country")
      .populate("city");

    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid Access Token"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json(
      new ApiError(403, `Token error ${error?.message}` || "Invalid access token")
    );
  }
});


// Admin-only middleware
export const adminOnly = asyncHandler((req, res, next) => {
  if (req.user?.user_role?.name !== "admin") {
    return res.status(403).json(new ApiError(403, "Admin access required"));
  }
  next();
});

// Customer-only middleware
export const customerOnly = asyncHandler((req, res, next) => {
  if (req.user?.user_role?.name !== "customer") {
    return res.status(403).json(new ApiError(403, "Customer access required"));
  }
  next();
});

// Tailor-only middleware
export const tailorOnly = asyncHandler((req, res, next) => {
  if (req.user?.user_role?.name !== "tailor") {
    return res.status(403).json(new ApiError(403, "Tailor access required"));
  }
  next();
});
