const axios = require('axios');
const Order = require('../models/Order');
const logger = require('../utils/logger');

// Carrier API integration configs (stubs)
const carrierAPIs = {
  aramex: process.env.CARRIER_ARAMEX_API_URL || '',
  emiratesPost: process.env.CARRIER_EMIRATES_POST_API_URL || '',
  localCouriers: process.env.CARRIER_LOCAL_COURIERS_API_URL || '',
};

exports.checkCarriersStatus = async (req, res, next) => {
  // Check all carrier APIs for availability (dummy implementation)
  try {
    const status = {
      aramex: true,
      emiratesPost: true,
      localCouriers: true,
    };
    res.json(status);
  } catch (error) {
    next(error);
  }
};

// Dynamic delivery pricing
exports.calculateDeliveryPrice = async (req, res, next) => {
  try {
    const { pickupLocation, deliveryLocation, urgency } = req.body;
    // Distance calculation stub (normally use external API)
    const basePrice = 50; // base AED
    let distanceKm = 10; // Dummy - should be distance between points
    let urgencyMultiplier = urgency === 'rush' ? 1.5 : 1;

    const totalPrice = basePrice + distanceKm * 5;
    const finalPrice = totalPrice * urgencyMultiplier;

    res.json({ price: finalPrice.toFixed(2), currency: 'AED' });
  } catch (error) {
    next(error);
  }
};

// Scheduling deliveries
exports.scheduleDelivery = async (req, res, next) => {
  try {
    const { orderId, preferredDateTime } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.deliveryCoordination = order.deliveryCoordination || {};
    order.deliveryCoordination.scheduledDateTime = new Date(preferredDateTime);
    order.deliveryCoordination.confirmed = false;

    await order.save();

    res.json({ message: 'Delivery scheduled. Awaiting confirmation.' });
  } catch (error) {
    next(error);
  }
};

exports.getDeliverySchedule = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const order = await Order.findOne({ _id: deliveryId }).lean();
    if (!order) return res.status(404).json({ message: 'Delivery/order not found' });

    res.json(order.deliveryCoordination);
  } catch (error) {
    next(error);
  }
};

// Return logistics
exports.initiateReturn = async (req, res, next) => {
  try {
    const { orderId, reason, photos } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.returnLogistics = {
      initiated: true,
      reason,
      photos: photos || [],
      status: 'pending',
      initiatedAt: new Date(),
    };
    await order.save();

    res.json({ message: 'Return process initiated' });
  } catch (error) {
    next(error);
  }
};

exports.getReturnStatus = async (req, res, next) => {
  try {
    const { returnId } = req.params;
    const order = await Order.findById(returnId).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order.returnLogistics || { status: 'no return found' });
  } catch (error) {
    next(error);
  }
};

// Shipment tracking
exports.getShipmentTracking = async (req, res, next) => {
  try {
    const { shipmentId } = req.params;
    // For demo, shipmentId == orderId
    const order = await Order.findById(shipmentId).lean();
    if (!order) return res.status(404).json({ message: 'Shipment not found' });

    res.json(order.deliveryCoordination || {});
  } catch (error) {
    next(error);
  }
};

// Update shipment status (admin only)
exports.updateShipmentStatus = async (req, res, next) => {
  try {
    const { shipmentId } = req.params;
    const { status, courierGPS } = req.body;

    const order = await Order.findById(shipmentId);
    if (!order) return res.status(404).json({ message: 'Shipment not found' });

    order.deliveryCoordination = order.deliveryCoordination || {};
    order.deliveryCoordination.status = status;
    if (courierGPS) {
      order.deliveryCoordination.courierGPS = courierGPS;
    }
    order.deliveryCoordination.updatedAt = new Date();

    await order.save();

    res.json({ message: 'Shipment status updated' });
  } catch (error) {
    next(error);
  }
};
