const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');
const { protect } = require('../middleware/authMiddleware');
const { validateSubscription, validateSendMessage } = require('../validators/communicationValidators');

// All routes protected
router.use(protect);

// Chat APIs
router.get('/chat/conversations', communicationController.listConversations);
router.post('/chat/send', validateSendMessage, communicationController.sendMessage);
router.get('/chat/messages/:conversationId', communicationController.getMessages);
router.delete('/chat/messages/:messageId', communicationController.deleteMessage);

// Push notifications
router.post('/notifications/subscribe', validateSubscription, communicationController.subscribeToPushNotifications);
router.post('/notifications/unsubscribe', validateSubscription, communicationController.unsubscribeFromPushNotifications);
router.post('/notifications/send', communicationController.sendPushNotification);

// SMS gateway integration
router.post('/sms/send', communicationController.sendSmsAlert);

// Email notification services
router.post('/email/send', communicationController.sendEmailNotification);

// Subscription management
router.get('/subscriptions', communicationController.getSubscriptions);
router.put('/subscriptions/preferences', communicationController.updateNotificationPreferences);

// Message history retrieval & moderation
router.get('/messages/history', communicationController.getAllMessages);
router.post('/messages/moderate', communicationController.moderateMessage);

module.exports = router;
