const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect, authorizeCustomer } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { validateOrderPlacement, validateReviewSubmission, validateProfileUpdate } = require('../validators/customerValidators');

// Public routes
router.post('/discovery/search', customerController.searchTailors);
router.post('/discovery/recommendations', customerController.getRecommendations);
router.get('/events/calendar', customerController.getEventsCalendar);

// Authentication protected routes
router.use(protect);
router.use(authorizeCustomer);

// Order placement and tracking
router.post('/orders', validateOrderPlacement, customerController.placeOrder);
router.get('/orders/:orderId/tracking', customerController.getOrderTracking);
router.get('/orders/history', customerController.getOrderHistory);
router.post('/orders/:orderId/payment', customerController.makePayment);
router.get('/orders/:orderId/status', customerController.getOrderStatus);
router.post('/orders/:orderId/photo-update', upload.single('progressPhoto'), customerController.uploadProgressPhoto);

// Personal management
router.get('/profile', customerController.getProfile);
router.put('/profile', validateProfileUpdate, customerController.updateProfile);
router.post('/measurements', customerController.createMeasurement);
router.get('/measurements', customerController.listMeasurements);
router.put('/measurements/:measurementId', customerController.updateMeasurement);
router.delete('/measurements/:measurementId', customerController.deleteMeasurement);
router.get('/family-profiles', customerController.listFamilyProfiles);
router.post('/family-profiles', customerController.createFamilyProfile);

// Community features
router.post('/reviews', validateReviewSubmission, customerController.submitReview);
router.get('/reviews/:tailorId', customerController.listReviews);
router.post('/reviews/:reviewId/report', customerController.reportReview);
router.get('/referrals/status', customerController.getReferralStatus);
router.post('/referrals/invite', customerController.sendReferralInvite);
router.post('/social/share', customerController.shareOnSocialMedia);

module.exports = router;
