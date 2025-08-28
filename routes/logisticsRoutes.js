import express from "express";
import * as logisticsController from "../controllers/logisticsController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

// Protect all routes
router.use(verifyJWT);

/** ---------------- CARRIERS ---------------- */
// Integration with carriers - Admin/Tailor roles mostly
router.get("/carriers/status", logisticsController.checkCarriersStatus);

/** ---------------- PRICING ---------------- */
// Pricing calculations - customers
router.post("/delivery/price", logisticsController.calculateDeliveryPrice);

/** ---------------- SCHEDULING DELIVERIES ---------------- */
// Scheduling deliveries - customers
router.post("/delivery/schedule", logisticsController.scheduleDelivery);
router.get("/delivery/schedule/:deliveryId", logisticsController.getDeliverySchedule);

/** ---------------- RETURN LOGISTICS ---------------- */
// Return logistics - customers
router.post("/returns/initiate", logisticsController.initiateReturn);
router.get("/returns/:returnId/status", logisticsController.getReturnStatus);

/** ---------------- SHIPMENT TRACKING ---------------- */
// Shipment tracking - all roles
router.get("/shipments/:shipmentId/tracking", logisticsController.getShipmentTracking);

/** ---------------- UPDATE STATUS ---------------- */
// Update status - logistics staff/admin
router.put(
  "/shipments/:shipmentId/status",adminOnly,logisticsController.updateShipmentStatus);

export default router;
