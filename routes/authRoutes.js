import { Router } from "express";
import { checkEmail,
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    generateOTP,
    verifyOTP,
    resetPassword,
    updateCoverImage,
    createFCMToken, } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/firebase.middleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import multer from "../middleware/multer.middleware.js";


const router = Router()

router.route("/check-email").post(checkEmail)
router.post("/register",multer.uploadUserFiles(),registerUser);
router.route("/login/:role_id").post(authenticateToken, loginUser)

router.route("/generate-otp").post(generateOTP)
router.route("/verify-otp").post(verifyOTP)
router.route("/reset-password").post(resetPassword)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, multer.uploadSingle("profile_image"), updateAccountDetails)
router.route("/update-cover-image").patch(verifyJWT, multer.uploadSingle("cover_image"), updateCoverImage)
router.route("/create-fcm-token").post(createFCMToken)


export default router