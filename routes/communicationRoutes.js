import express from "express";
import * as communicationController from "../controllers/communicationController.js";
import {
  validateSubscription,
  validateSendMessage,
} from "../validators/communicationValidators.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

/** ---------------- CHAT APIs ---------------- */
router.get("/chat/conversations", communicationController.listConversations);
router.post("/chat/send", validateSendMessage, communicationController.sendMessage);
router.get("/chat/messages/:conversationId", communicationController.getMessages);
router.delete("/chat/messages/:messageId", communicationController.deleteMessage);

/** ---------------- PUSH NOTIFICATIONS ---------------- */
router.post("/notifications/subscribe", validateSubscription, communicationController.subscribeToPushNotifications);
router.post("/notifications/unsubscribe", validateSubscription, communicationController.unsubscribeFromPushNotifications);
router.post("/notifications/send", communicationController.sendPushNotification);

/** ---------------- SMS GATEWAY ---------------- */
router.post("/sms/send", communicationController.sendSmsAlert);

/** ---------------- EMAIL SERVICES ---------------- */
router.post("/email/send", communicationController.sendEmailNotification);

/** ---------------- SUBSCRIPTION MANAGEMENT ---------------- */
router.get("/subscriptions", communicationController.getSubscriptions);
router.put("/subscriptions/preferences", communicationController.updateNotificationPreferences);

/** ---------------- MESSAGE HISTORY & MODERATION ---------------- */
router.get("/messages/history", communicationController.getAllMessages);
router.post("/messages/moderate", communicationController.moderateMessage);

export default router;
