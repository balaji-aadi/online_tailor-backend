const mongoose = require('mongoose');

const qcCheckpointSchema = new mongoose.Schema({
  photoUrl: { type: String },
  metadata: {
    filename: String,
    mimetype: String,
    size: Number,
    uploadedAt: Date,
  },
});

const partialDeliverySchema = new mongoose.Schema({
  itemId: { type: String },
  quantityDelivered: { type: Number },
  deliveryDate: { type: Date },
  notes: { type: String },
});

const resourcePlanningSchema = new mongoose.Schema({
  material: String,
  quantityNeeded: Number,
  supplierReference: String,
});

const lifecycleStatusSchema = new mongoose.Schema({
  current: { type: String, default: 'pending' },
  timestamps: {
    pending: Date,
    in_progress: Date,
    qc_check: Date,
    completed: Date,
    cancelled: Date,
  },
});

const deliveryCoordinationSchema = new mongoose.Schema({
  scheduledDateTime: Date,
  confirmed: { type: Boolean, default: false },
  status: { type: String },
  courierGPS: {
    latitude: Number,
    longitude: Number,
  },
  updatedAt: Date,
});

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tailorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    intakeChannel: { type: String, enum: ['mobile_app', 'web', 'call_center'], default: 'mobile_app' },
    classification: { type: String, enum: ['ready-made', 'alteration', 'custom'], required: true },
    lifecycleStatus: lifecycleStatusSchema,
    batchGroupId: { type: String },
    resourcePlanning: [resourcePlanningSchema],
    qcCheckpoints: [qcCheckpointSchema],
    rushOrder: { type: Boolean, default: false },
    rushPricingMultiplier: { type: Number, default: 1.0 },
    partialDeliveries: [partialDeliverySchema],
    deliveryCoordination: deliveryCoordinationSchema,
    orderDetails: { type: Object },
    measurements: { type: Object },
    customizations: { type: Object },
    deliveryAddress: { type: Object },
    progressPhotos: [
      {
        url: String,
        uploadedAt: Date,
        mimetype: String,
        size: Number,
      },
    ],
    returnLogistics: {
      initiated: Boolean,
      reason: String,
      photos: [String],
      status: String,
      initiatedAt: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
