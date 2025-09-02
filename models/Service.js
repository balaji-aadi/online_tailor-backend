import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceSchema = new mongoose.Schema(
  {
    serviceId: { type: String, unique: true, required: true }, 
     tailorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    serviceName: { type: String, required: true },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // from Category master
      required: true,
    },
    description: { type: String },

    gender: { type: String, enum: ["Male", "Female"], required: true },

    // Stitching / Alteration Options
    garmentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty", // from Specialty master
    },
    fabricType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fabric", // from Fabric master
    },
    stylePattern: { type: String },
    measurementType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeasurementTemplate",
    },
    requestedAlteration: { type: String },
    addOn: { type: String },
    fittingPreferences: {
      type: String,
      enum: ["Slim Fit", "Regular", "Comfort"],
    },

    // Service Delivery
    expressDelivery: { type: Boolean, default: false },
    estimatedDuration: { type: Number }, // days
    expressDuration: { type: Number }, // days
    preferenceDuration: { type: Number }, // days
    regularDuration: { type: Number }, // days
    trialsOffered: { type: Number, default: 0 },

    // Pricing & Charges
    basePrice: { type: Number, required: true },
    expressPrice: { type: Number },
    preferencePrice: { type: Number },
    extraCharges: { type: Number },
    discount: { type: Number, default: 0 },

    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
