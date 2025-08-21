const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['push', 'sms', 'email'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    metadata: { type: Object },
    read: { type: Boolean, default: false },
    scheduledAt: { type: Date },
    deliveryAttempts: { type: Number, default: 0 },
    fallbackChannels: [{ type: String }],
    dispatchedAt: { type: Date },
    subscription: { type: Object }, // for push notifications subscription info
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
