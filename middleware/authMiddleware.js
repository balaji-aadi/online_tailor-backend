// authMiddleware.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Verify JWT already exists
export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log("token", token);
        if (!token) {
            return res.status(401).json(new ApiError(401, "Unauthorized request"));
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -otp -otp_time")
        .populate("user_role")
        .populate("country")
        .populate("city");
    
        if (!user) {
            return res.status(401).json(new ApiError(401, "Invalid Access Token"));
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(403).json(new ApiError(403, `Token error ${error?.message}` || "Invalid access token"));
    }
    
})

// Admin authorization middleware
// export const authorizeAdmin = (req, res, next) => {
//   if (!req.user || req.user.user_role?.name !== "admin") {
//     return res.status(403).json(new ApiError(403, "Forbidden: Admins only"));
//   }
//   next();
// };

