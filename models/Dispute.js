import mongoose from 'mongoose';

const DisputeSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  status: { type: String, default: 'open' },
  evidence: { type: Array, default: [] },
  description: { type: String },
  resolutionDetails: { type: Object, default: {} },
  communicationChannel: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Dispute', DisputeSchema);
