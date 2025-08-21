const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Notification = require('../models/Notification');
const logger = require('../utils/logger');

// Initialize Firebase Admin SDK with service account
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : null;
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
});

// Twilio client setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

exports.sendPushNotification = async (userId, message) => {
  try {
    // Retrieve push subscription for user
    const notification = await Notification.findOne({ userId, type: 'push' });
    if (!notification || !notification.subscription) {
      logger.warn(`No push subscription found for user ${userId}`);
      return;
    }
    const payload = {
      notification: {
        title: 'Notification',
        body: message,
      },
      data: { message },
    };
    await admin.messaging().sendToDevice(notification.subscription.tokens || [], payload);
    logger.info(`Push notification sent to user ${userId}`);
  } catch (err) {
    logger.error('Error sending push notification:', err);
  }
};

exports.sendSms = async (to, message) => {
  try {
    if (!twilioClient) throw new Error('Twilio client not initialized');
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    logger.info(`SMS sent to ${to}`);
  } catch (err) {
    logger.error(`Error sending SMS to ${to}`, err);
  }
};

exports.sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email sent to ${to}`);
  } catch (err) {
    logger.error(`Error sending email to ${to}`, err);
  }
};

exports.sendBulkNotifications = async (notifications) => {
  for (const noti of notifications) {
    try {
      switch (noti.type) {
        case 'push':
          await exports.sendPushNotification(noti.userId, noti.message);
          break;
        case 'sms':
          // For SMS, we need user contact info
          // Assuming user model relationship or notification metadata has phone
          break;
        case 'email':
          // For email, user email needed
          // Assuming notification has email metadata
          break;
      }
    } catch (err) {
      logger.error(`Error sending notification to user ${noti.userId}: ${err}`);
    }
  }
};
