import mongoose from 'mongoose';

const versionHistorySchema = new mongoose.Schema({
  measurements: {
    iv: String,
    content: String,
  },
  updatedAt: { type: Date, default: Date.now },
});

const accessControlSchema = new mongoose.Schema({
  allowedTailors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const measurementSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    encryptedMeasurements: {
      iv: { type: String, required: true },
      content: { type: String, required: true },
    },
    versionHistory: [versionHistorySchema],
    tailorVerifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    templateId: { type: String },
    // familyProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyProfile' },
    accessControl: accessControlSchema,
  },
  { timestamps: true }
);

const Measurement = mongoose.model('Measurement', measurementSchema);
export default Measurement;
