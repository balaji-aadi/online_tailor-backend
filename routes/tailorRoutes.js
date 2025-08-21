const express = require('express');
const router = express.Router();
const tailorController = require('../controllers/tailorController');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorizeTailor } = require('../middleware/authMiddleware');
const { validateProfileUpdate, validateOrderUpdate, validateAppointmentScheduling, validateFinancialData } = require('../validators/tailorValidators');

// All routes protected and only accessible by tailors
router.use(protect);
router.use(authorizeTailor);

// Business profile management
router.get('/profile', tailorController.getProfile);
router.put('/profile', validateProfileUpdate, tailorController.updateProfile);
router.post('/portfolio/upload', upload.array('portfolioImages', 20), tailorController.uploadPortfolio);
router.get('/portfolio', tailorController.listPortfolio);
router.delete('/portfolio/:fileId', tailorController.deletePortfolioFile);
router.post('/specializations', tailorController.addSpecialization);
router.delete('/specializations/:specializationId', tailorController.removeSpecialization);
router.post('/certifications', upload.array('certificationDocs', 10), tailorController.uploadCertifications);
router.get('/certifications', tailorController.listCertifications);
router.delete('/certifications/:certificationId', tailorController.deleteCertification);

// Order management
router.get('/orders', tailorController.listOrders);
router.get('/orders/:orderId', tailorController.getOrderDetails);
router.put('/orders/:orderId/status', validateOrderUpdate, tailorController.updateOrderStatus);
router.post('/orders/batch/process', tailorController.batchProcessOrders);
router.post('/orders/:orderId/qcphotos', upload.array('qcPhotos', 30), tailorController.uploadQCPhotos);
router.post('/orders/:orderId/rush', tailorController.markRushOrder);
router.put('/orders/:orderId/partial-delivery', tailorController.updatePartialDelivery);
router.get('/orders/:orderId/tracking', tailorController.getOrderTracking);

// Customer interaction tools
router.get('/chat/conversations', tailorController.listChats);
router.post('/chat/send', tailorController.sendMessage);
router.post('/appointments/schedule', validateAppointmentScheduling, tailorController.scheduleAppointment);
router.get('/appointments', tailorController.listAppointments);
router.post('/media/share/photo', upload.single('photo'), tailorController.sharePhotoNote);
router.post('/media/share/voice', upload.single('voiceNote'), tailorController.shareVoiceNote);

// Financial management
router.get('/financial/revenue', tailorController.getRevenueTracking);
router.get('/financial/commissions', tailorController.getCommissionDetails);
router.post('/financial/invoice', validateFinancialData, tailorController.generateInvoice);
router.get('/financial/analytics', tailorController.getFinancialAnalytics);

module.exports = router;
