import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    tailor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryOption: {
      type: String,
      enum: ["regular", "express", "preference"],
      default: "regular",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    additionalNotes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);




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

const readymadeOrderSchema = new mongoose.Schema(
  {
    customer: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
    },
    readymadeCloth: { type: mongoose.Schema.Types.ObjectId, ref: "ReadymadeCloth", required: true },
    tailorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    finalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

export const ReadymadeOrder= mongoose.model("ReadymadeOrder", readymadeOrderSchema);



export const Order = mongoose.model('Order', orderSchema);

