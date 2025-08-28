import mongoose from 'mongoose';

const ratingMetricsSchema = new mongoose.Schema({
  quality: { type: Number, min: 1, max: 5 },
  timeliness: { type: Number, min: 1, max: 5 },
  communication: { type: Number, min: 1, max: 5 },
  value: { type: Number, min: 1, max: 5 },
});

const communityReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: { type: String },
  reportedAt: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tailorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: ratingMetricsSchema,
    reviewText: { type: String },
    photos: [{ type: String }],
    isVerifiedPurchase: { type: Boolean, default: false },
    moderationStatus: {
      type: String,
      enum: ['pending', 'approved', 'flagged', 'removed'],
      default: 'pending',
    },
    communityReports: [communityReportSchema],
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
