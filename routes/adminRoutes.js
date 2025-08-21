const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { validateAdminUserVerification, validateBulkImport, validateBroadcastNotification, validateDisputeResolution, validateContentUpdate } = require('../validators/adminValidators');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

// User Management
router.use(protect);
router.use(authorizeAdmin);

// User verification and approval
router.post('/users/verify', validateAdminUserVerification, adminController.verifyUser);
router.post('/users/approve', adminController.approveUser);
router.put('/users/roles/:userId', adminController.updateUserRole); // multi-tier role management with audit trail

// Bulk import/export
router.post('/users/import', validateBulkImport, adminController.bulkImportUsers);
router.get('/users/export', adminController.bulkExportUsers);

// Broadcast notifications
router.post('/notifications/broadcast', validateBroadcastNotification, adminController.broadcastNotifications);

// Blacklist / Whitelist
router.post('/users/blacklist', adminController.blacklistUser);
router.post('/users/whitelist', adminController.whitelistUser);

// White-label config management
router.get('/config/whitelabel', adminController.getWhiteLabelConfig);
router.put('/config/whitelabel', adminController.updateWhiteLabelConfig);

// Analytics & Reporting
router.get('/analytics/metrics', adminController.getRealTimeMetrics);
router.get('/analytics/geodistribution', adminController.getGeographicDistribution);
router.get('/analytics/bi', adminController.getBusinessIntelligence);

// Dispute resolution
router.post('/disputes/initiate', validateDisputeResolution, adminController.initiateDispute);
router.put('/disputes/:disputeId/mediate', adminController.mediateDispute);
router.get('/disputes/:disputeId', adminController.getDisputeDetails);

// Content management
router.get('/content', adminController.listContent);
router.post('/content', validateContentUpdate, adminController.createContent);
router.put('/content/:contentId', validateContentUpdate, adminController.updateContent);
router.delete('/content/:contentId', adminController.deleteContent);

module.exports = router;
