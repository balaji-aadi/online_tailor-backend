import mongoose from 'mongoose';

const fileMetadataSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String },
  filetype: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
});

const operatingHourSchema = new mongoose.Schema({
  day: { type: String, required: true, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  open: { type: String, required: true }, // e.g. "09:00"
  close: { type: String, required: true }, // e.g. "18:00"
  isClosed: { type: Boolean, default: false },
});

const tailorProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessLicenseInfo: {
      licenseNumber: { type: String },
      issuedBy: { type: String },
      validFrom: { type: Date },
      validTo: { type: Date },
      licenseDocumentUrl: { type: String },
    },
    gpsAddress: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    contact: {
      phone: { type: String },
      email: { type: String },
      website: { type: String },
    },
    operatingHours: [operatingHourSchema],
    specializations: [{ type: String }], // garment types
    certifications: [
      {
        name: String,
        documentUrl: String,
        issuedDate: Date,
        expiryDate: Date,
      },
    ],
    multimediaPortfolio: [fileMetadataSchema],
    serviceCatalog: [
      {
        serviceName: String,
        description: String,
        pricingTiers: [{ minQty: Number, maxQty: Number, price: Number }],
        currency: { type: String, default: 'AED' },
      },
    ],
    capacityLimits: {
      maxOrdersPerDay: { type: Number },
      maxBatchSize: { type: Number },
    },
    availabilityCalendar: [{ date: Date, isAvailable: Boolean, specialDescription: String }],
    insuranceInfo: {
      policyNumber: String,
      provider: String,
      expiryDate: Date,
    },
    warrantyInfo: {
      durationMonths: Number,
      termsUrl: String,
    },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

tailorProfileSchema.index({ gpsAddress: '2dsphere' });

const TailorProfile = mongoose.model('TailorProfile', tailorProfileSchema);
export default TailorProfile;
