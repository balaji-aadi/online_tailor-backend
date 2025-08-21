const TailorProfile = require('../models/TailorProfile');
const Order = require('../models/Order');
const Measurement = require('../models/Measurement');
const Review = require('../models/Review');
const FamilyProfile = require('../models/FamilyProfile');
const logger = require('../utils/logger');
const crypto = require('crypto');
const mongoose = require('mongoose');

// AI-based tailor discovery algorithms (simplified)
exports.searchTailors = async (req, res, next) => {
  try {
    const { location, preferences, filters } = req.body;

    // Simple geo spatial query example for nearby tailors
    const tailors = await TailorProfile.find({
      'gpsAddress.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
          $maxDistance: 50000,
        },
      },
      specializations: { $in: preferences.specializations || [] },
    }).limit(20).lean();

    res.json({ results: tailors });
  } catch (error) {
    next(error);
  }
};

// Personalized recommendations (stub)
exports.getRecommendations = async (req, res, next) => {
  // For demo, return top rated tailors
  try {
    const topTailors = await TailorProfile.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: 'userId',
          foreignField: 'tailorId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          avgReview: { $avg: '$reviews.qualityRating' },
        },
      },
      { $sort: { avgReview: -1 } },
      { $limit: 10 },
    ]);
    res.json(topTailors);
  } catch (error) {
    next(error);
  }
};

// Events calendar
exports.getEventsCalendar = async (req, res, next) => {
  res.json({ message: 'Events calendar - to be implemented' });
};

// Order placement with dynamic pricing & multi-payment support
exports.placeOrder = async (req, res, next) => {
  try {
    const {
      tailorId,
      orderDetails,
      measurements,
      paymentMethod,
      customizations,
      deliveryAddress,
    } = req.body;

    const order = new Order({
      customerId: req.user._id,
      tailorId,
      intakeChannel: 'mobile_app',
      classification: orderDetails.classification,
      lifecycleStatus: {
        current: 'pending',
        timestamps: { pending: new Date() },
      },
      orderDetails,
      measurements,
      customizations,
      deliveryAddress,
      createdAt: new Date(),
    });

    await order.save();

    // Payment handling stub
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    next(error);
  }
};

// Order tracking
exports.getOrderTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid orderId' });
    }
    const order = await Order.findOne({ _id: orderId, customerId: req.user._id }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ lifecycleStatus: order.lifecycleStatus, photos: order.progressPhotos || [] });
  } catch (error) {
    next(error);
  }
};

// Order history
exports.getOrderHistory = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Payment (stub)
exports.makePayment = async (req, res, next) => {
  // Payment gateway integration to be implemented
  res.json({ message: 'Payment processing - to be implemented' });
};

// Order status
exports.getOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, customerId: req.user._id }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ status: order.lifecycleStatus.current });
  } catch (error) {
    next(error);
  }
};

// Upload progress photo
exports.uploadProgressPhoto = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!req.file) return res.status(400).json({ message: 'No photo uploaded' });

    const order = await Order.findOne({ _id: orderId, customerId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.progressPhotos = order.progressPhotos || [];
    order.progressPhotos.push({
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date(),
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    await order.save();

    res.status(201).json({ message: 'Progress photo uploaded', progressPhotos: order.progressPhotos });
  } catch (error) {
    next(error);
  }
};

// Customer profile management
exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      email: user.email,
      roles: user.roles,
      contact: user.contact,
      notificationPreferences: user.notificationPreferences,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { contact, notificationPreferences } = req.body;
    const user = req.user;

    if (contact) user.contact = contact;
    if (notificationPreferences) user.notificationPreferences = notificationPreferences;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Secure measurements vault
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(String(process.env.MEASUREMENT_ENCRYPT_KEY || 'defaultkey')).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);

const encryptField = (data) => {
  const ivBuf = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, ivBuf);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: ivBuf.toString('hex'),
    content: encrypted,
  };
};

const decryptField = (encrypted) => {
  const ivBuf = Buffer.from(encrypted.iv, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuf);
  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

exports.createMeasurement = async (req, res, next) => {
  try {
    const { measurements, templateId, tailorId, familyProfileId } = req.body;

    const encryptedMeasurements = encryptField(measurements);

    const newMeasurement = await new Measurement({
      customerId: req.user._id,
      encryptedMeasurements,
      templateId,
      tailorVerifications: [tailorId].filter(Boolean),
      familyProfile: familyProfileId || null,
      accessControl: { allowedTailors: tailorId ? [tailorId] : [] },
      versionHistory: [{ measurements: encryptedMeasurements, updatedAt: new Date() }],
      createdAt: new Date(),
    }).save();

    res.status(201).json({ message: 'Measurement stored securely', measurementId: newMeasurement._id });
  } catch (error) {
    next(error);
  }
};

exports.listMeasurements = async (req, res, next) => {
  try {
    const measurements = await Measurement.find({ customerId: req.user._id }).lean();
    const decryptedMeasurements = measurements.map((m) => ({
      _id: m._id,
      measurements: decryptField(m.encryptedMeasurements),
      templateId: m.templateId,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    }));
    res.json(decryptedMeasurements);
  } catch (error) {
    next(error);
  }
};

exports.updateMeasurement = async (req, res, next) => {
  try {
    const { measurementId } = req.params;
    const { measurements } = req.body;
    const measurement = await Measurement.findOne({ _id: measurementId, customerId: req.user._id });
    if (!measurement) return res.status(404).json({ message: 'Measurement not found' });

    const encryptedMeasurements = encryptField(measurements);

    measurement.encryptedMeasurements = encryptedMeasurements;
    measurement.versionHistory.push({ measurements: encryptedMeasurements, updatedAt: new Date() });
    measurement.updatedAt = new Date();
    await measurement.save();

    res.json({ message: 'Measurement updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteMeasurement = async (req, res, next) => {
  try {
    const { measurementId } = req.params;
    await Measurement.deleteOne({ _id: measurementId, customerId: req.user._id });
    res.json({ message: 'Measurement deleted' });
  } catch (error) {
    next(error);
  }
};

// Family profiles linking shared measurement access
exports.listFamilyProfiles = async (req, res, next) => {
  try {
    // For demo purpose, returning empty array (needs FamilyProfile model)
    res.json([]);
  } catch (error) {
    next(error);
  }
};

exports.createFamilyProfile = async (req, res, next) => {
  try {
    res.status(201).json({ message: 'Create family profile - to be implemented' });
  } catch (error) {
    next(error);
  }
};

// Reviews and ratings management
exports.submitReview = async (req, res, next) => {
  try {
    const { tailorId, ratings, reviewText, photos, isVerifiedPurchase } = req.body;

    const review = await new Review({
      customerId: req.user._id,
      tailorId,
      ratings,
      reviewText,
      photos: photos || [],
      isVerifiedPurchase: !!isVerifiedPurchase,
      moderationStatus: 'pending',
      createdAt: new Date(),
    }).save();

    res.status(201).json({ message: 'Review submitted and pending moderation', reviewId: review._id });
  } catch (error) {
    next(error);
  }
};

exports.listReviews = async (req, res, next) => {
  try {
    const { tailorId } = req.params;
    const reviews = await Review.find({ tailorId, moderationStatus: 'approved' }).lean();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.reportReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.communityReports = review.communityReports || [];
    review.communityReports.push({
      userId: req.user._id,
      reason,
      reportedAt: new Date(),
    });
    await review.save();

    res.json({ message: 'Review reported for moderation' });
  } catch (error) {
    next(error);
  }
};

// Referral system
exports.getReferralStatus = async (req, res, next) => {
  try {
    res.json({ message: 'Referral status - to be implemented' });
  } catch (error) {
    next(error);
  }
};

exports.sendReferralInvite = async (req, res, next) => {
  try {
    res.json({ message: 'Send referral invite - to be implemented' });
  } catch (error) {
    next(error);
  }
};

// Social sharing endpoints
exports.shareOnSocialMedia = async (req, res, next) => {
  try {
    res.json({ message: 'Social media sharing - to be implemented' });
  } catch (error) {
    next(error);
  }
};
