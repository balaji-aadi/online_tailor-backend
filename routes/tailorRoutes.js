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

const router = express.Router();

router.use(verifyJWT);

/** ---------------- BUSINESS PROFILE MANAGEMENT ---------------- */
router.get("/profile", tailorController.getProfile);
router.put("/profile", validateProfileUpdate, tailorController.updateProfile);

router.post("/portfolio/upload",multer.uploadSingle("progressPhoto"),tailorController.uploadPortfolio);
router.get("/portfolio", tailorController.listPortfolio);
router.delete("/portfolio/:fileId", tailorController.deletePortfolioFile);

// Removed: add/remove specializations (handlers not implemented)

// Removed: certifications routes (handlers not implemented)

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
