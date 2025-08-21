const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');
const { protect, authorizeCustomer, authorizeTailor, authorizeAdmin } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

// Integration with carriers - Admin/Tailor roles mostly
router.get('/carriers/status', logisticsController.checkCarriersStatus);

// Pricing calculations - customers
router.post('/delivery/price', logisticsController.calculateDeliveryPrice);

// Scheduling deliveries - customers
router.post('/delivery/schedule', logisticsController.scheduleDelivery);
router.get('/delivery/schedule/:deliveryId', logisticsController.getDeliverySchedule);

// Return logistics - customers
router.post('/returns/initiate', logisticsController.initiateReturn);
router.get('/returns/:returnId/status', logisticsController.getReturnStatus);

// Shipment tracking - all roles
router.get('/shipments/:shipmentId/tracking', logisticsController.getShipmentTracking);

// Update status - logistics staff/admin
router.put('/shipments/:shipmentId/status', authorizeAdmin, logisticsController.updateShipmentStatus);

module.exports = router;
