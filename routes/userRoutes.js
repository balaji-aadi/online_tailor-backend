import { deleteUserById, getUserById, updateUserById } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import multer from "../middleware/multer.middleware.js";
import express from "express";

const router = express.Router();

router.use(verifyJWT);

router.get("/get-tailor-profile/:userId", getUserById);
router.put("/update-tailor-profile/:userId", multer.uploadUserFiles(), updateUserById);
router.delete("/delete-tailor-profile/:userId", deleteUserById);


export default router;