import express from "express";
import * as tailorController from "../controllers/tailorController.js";
import multer from "../middleware/multer.middleware.js";
import {
  validateProfileUpdate,
  validateOrderUpdate,
  validateAppointmentScheduling,
  validateFinancialData,
} from "../validators/tailorValidators.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { deleteUserById, getUserById, updateUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.use(verifyJWT);


// router.get("/get-tailor-profile/:userId", getUserById);
// router.put("/update-tailor-profile/:userId", multer.uploadUserFiles(), validateProfileUpdate, updateUserById);
// router.delete("/delete-tailor-profile/:userId", deleteUserById);


/** ---------------- ORDER MANAGEMENT ---------------- */
router.get("/orders", tailorController.listOrders);
router.get("/orders/:orderId", tailorController.getOrderDetails);
router.put("/orders/:orderId/status", validateOrderUpdate, tailorController.updateOrderStatus);
// Removed: batch process and QC photo upload (handlers not implemented)
router.post("/orders/:orderId/rush", tailorController.markRushOrder);
// Removed: partial delivery update (handler not implemented)
router.get("/orders/:orderId/tracking", tailorController.getOrderTracking);

/** ---------------- CUSTOMER INTERACTION TOOLS ---------------- */
// router.get("/chat/conversations", tailorController.listChats);
// router.post("/chat/send", tailorController.sendMessage);
// Removed: appointments and media share routes (handlers not implemented)

/** ---------------- FINANCIAL MANAGEMENT ---------------- */
// Removed: financial routes (handlers not implemented)

export default router;
