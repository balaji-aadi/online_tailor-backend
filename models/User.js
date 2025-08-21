const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auditTrailSchema = new mongoose.Schema({
  action: { type: String, required: true },
  by: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  previousRoles: [{ type: String }],
  newRoles: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
});

const verificationDocumentSchema = new mongoose.Schema({
  type: { type: String },
  url: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const blacklistSchema = new mongoose.Schema({
  isBlacklisted: { type: Boolean, default: false },
  reason: { type: String },
  expiryDate: { type: Date },
});

const whitelistSchema = new mongoose.Schema({
  isWhitelisted: { type: Boolean, default: false },
  reason: { type: String },
  expiryDate: { type: Date },
});

const contactSchema = new mongoose.Schema({
  phone: { type: String },
  address: { type: String },
  alternateEmails: [{ type: String }],
});

const notificationPreferencesSchema = new mongoose.Schema({
  push: { type: Boolean, default: true },
  sms: { type: Boolean, default: false },
  email: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    roles: [{ type: String, enum: ['admin', 'tailor', 'customer'], default: 'customer' }],
    isVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
    documents: [verificationDocumentSchema],
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date },
    auditTrail: [auditTrailSchema],
    blacklist: blacklistSchema,
    whitelist: whitelistSchema,
    contact: contactSchema,
    notificationPreferences: notificationPreferencesSchema,
  },
  { timestamps: true }
);

// Middleware for hashing password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to validate password
userSchema.methods.validatePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, roles: this.roles }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
