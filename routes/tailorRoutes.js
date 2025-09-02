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



/** ---------------- Readymade Cloths ---------------- */
router.post("/create-service",verifyJWT,multer.uploadMultiple("image"), tailorController.createProductService);
router.put("/update-service/:id",verifyJWT,multer.uploadMultiple("image"), tailorController.updateService);
router.get("/get-service-byid/:id",verifyJWT, tailorController.getServiceById);
router.delete("/delete-service/:id",verifyJWT, tailorController.deleteService);
router.post("/get-all-service/:tailorId",verifyJWT, tailorController.getReadymadeClothsByTailor);
router.post("/get-all-service",verifyJWT, tailorController.getAllServices);


/** ---------------- Readymade Cloths ---------------- */
router.post("/create-readymade-cloth",verifyJWT,multer.uploadMultiple("image"), tailorController.createReadymadeCloth);
router.put("/update-readymade-cloth/:id",verifyJWT,multer.uploadMultiple("image"), tailorController.updateReadymadeCloth);
router.get("/get-readymade-cloth/:id",verifyJWT, tailorController.getReadymadeCloth);
router.delete("/delete-readymade-cloth/:id",verifyJWT, tailorController.deleteReadymadeCloth);
router.post("/get-all-readymade-cloth-by-Tailor/:tailorId",verifyJWT, tailorController.getReadymadeClothsByTailor);
router.post("/get-all-readymade-cloth",verifyJWT, tailorController.getReadymadeCloths);


/** ---------------- ORDER MANAGEMENT ---------------- */
router.post("/create-tailor-inventory",verifyJWT, tailorController.createTailorInventory);
router.put("/update-tailor-inventory/:id",verifyJWT, tailorController.updateTailorInventory);
router.get("/tailor-single-inventory/:id",verifyJWT, tailorController.getInventoryById);
router.delete("/delete-tailor-inventory/:id",verifyJWT, tailorController.deleteTailorInventory);
router.post("/get-tailor-inventories/:tailorId",verifyJWT, tailorController.getTailorInventories);
router.post("/get-all-inventories",verifyJWT, tailorController.getAllTailorInventories);


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
