const Chat = require('../models/Chat');
const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

// Real-time chat message management
exports.listConversations = async (req, res, next) => {
  try {
    const conversations = await Chat.find({ participants: req.user._id })
      .select('participants lastMessage updatedAt')
      .populate('participants', 'email roles')
      .lean();

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: 'Invalid conversationId' });
    }

    const chat = await Chat.findById(conversationId);
    if (!chat) return res.status(404).json({ message: 'Conversation not found' });

    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not participant of this conversation' });
    }

    const newMessage = {
      senderId: req.user._id,
      text: message,
      createdAt: new Date(),
    };

    chat.messages.push(newMessage);
    chat.lastMessage = message;
    chat.updatedAt = new Date();

    await chat.save();

    // Send realtime push notification to other participants asynchronously
    chat.participants.forEach((participant) => {
      if (participant.toString() !== req.user._id.toString()) {
        notificationService.sendPushNotification(participant, `New message: ${message}`)
          .catch((err) => logger.error(err));
      }
    });

    res.status(201).json({ message: 'Message sent', newMessage });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(conversationId)) return res.status(400).json({ message: 'Invalid conversationId' });

    const chat = await Chat.findById(conversationId).lean();
    if (!chat) return res.status(404).json({ message: 'Conversation not found' });

    if (!chat.participants.includes(req.user._id)) return res.status(403).json({ message: 'Not participant' });

    res.json(chat.messages);
  } catch (error) {
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(messageId)) return res.status(400).json({ message: 'Invalid messageId' });

    // Find which chat contains message and confirm ownership
    const chat = await Chat.findOne({ 'messages._id': messageId, 'messages.senderId': req.user._id });
    if (!chat) return res.status(404).json({ message: 'Message not found or no permission' });

    chat.messages = chat.messages.filter((msg) => msg._id.toString() !== messageId);
    await chat.save();

    res.json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

// Push notifications subscription management
exports.subscribeToPushNotifications = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    if (!subscription) return res.status(400).json({ message: 'Subscription object required' });

    await Notification.updateOne(
      { userId: req.user._id, type: 'push' },
      { $set: { subscription } },
      { upsert: true }
    );

    res.json({ message: 'Subscribed to push notifications' });
  } catch (error) {
    next(error);
  }
};

exports.unsubscribeFromPushNotifications = async (req, res, next) => {
  try {
    await Notification.deleteOne({ userId: req.user._id, type: 'push' });
    res.json({ message: 'Unsubscribed from push notifications' });
  } catch (error) {
    next(error);
  }
};

exports.sendPushNotification = async (req, res, next) => {
  try {
    const { userId, message } = req.body;
    await notificationService.sendPushNotification(userId, message);
    res.json({ message: 'Push notification sent' });
  } catch (error) {
    next(error);
  }
};

exports.sendSmsAlert = async (req, res, next) => {
  try {
    const { phoneNumber, message } = req.body;
    await notificationService.sendSms(phoneNumber, message);
    res.json({ message: 'SMS sent successfully' });
  } catch (error) {
    next(error);
  }
};

exports.sendEmailNotification = async (req, res, next) => {
  try {
    const { email, subject, text, html } = req.body;
    await notificationService.sendEmail(email, subject, text, html);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    next(error);
  }
};

// Subscription preferences retrieval and update
exports.getSubscriptions = async (req, res, next) => {
  try {
    const subs = await Notification.find({ userId: req.user._id });
    res.json(subs);
  } catch (error) {
    next(error);
  }
};

exports.updateNotificationPreferences = async (req, res, next) => {
  try {
    const { preferences } = req.body; // e.g., { push: true, email: false, sms: true }
    req.user.notificationPreferences = preferences;
    await req.user.save();
    res.json({ message: 'Notification preferences updated' });
  } catch (error) {
    next(error);
  }
};

// Message history retrieval with pagination
exports.getAllMessages = async (req, res, next) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const messages = await Chat.aggregate([
      { $match: { participants: req.user._id } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          _id: '$messages._id',
          text: '$messages.text',
          senderId: '$messages.senderId',
          createdAt: '$messages.createdAt',
        },
      },
    ]);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// Message moderation by admin
exports.moderateMessage = async (req, res, next) => {
  try {
    const { messageId, action } = req.body;
    if (!mongoose.Types.ObjectId.isValid(messageId)) return res.status(400).json({ message: 'Invalid messageId' });
    // action: approve, flag, remove
    const chat = await Chat.findOne({ 'messages._id': messageId });
    if (!chat) return res.status(404).json({ message: 'Message not found' });

    const messageIndex = chat.messages.findIndex((msg) => msg._id.toString() === messageId);
    if (messageIndex === -1) return res.status(404).json({ message: 'Message not found' });

    switch (action) {
      case 'remove':
        chat.messages.splice(messageIndex, 1);
        break;
      case 'flag':
      case 'approve':
        chat.messages[messageIndex].moderationStatus = action;
        break;
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

    await chat.save();

    res.json({ message: `Message ${action}d successfully` });
  } catch (error) {
    next(error);
  }
};
