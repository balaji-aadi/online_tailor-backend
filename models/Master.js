import mongoose, { Schema } from "mongoose";

//country schema
const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 250,
    },
    iso_2: {
      type: String,
      unique: true,
      required: true,
      maxlength: 250,
    },
    iso_3: {
      type: String,
      required: true,
      maxlength: 250,
    },
    dial_code: {
      type: String,
      required: true,
      maxlength: 250,
    },
    currencyCode: {
      type: String,
      maxlength: 50,
      default: null,
    },
    symbol: {
      type: String,
      maxlength: 50,
      default: null,
    },
    symbolNative: {
      type: String,
      maxlength: 50,
      default: null,
    },
    flag: {
      type: String,
      default: null,
    },
    latitude: {
      type: String,
      maxlength: 250,
      default: null,
    },
    longitude: {
      type: String,
      maxlength: 250,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

countrySchema.index({ name: 1 });

//city schema
const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 250,
    },
    latitude: {
      type: String,
      maxlength: 250,
      default: null,
    },
    longitude: {
      type: String,
      maxlength: 250,
      default: null,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

citySchema.index({ name: 1 });

const locationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    city: { type: Schema.Types.ObjectId, ref: "City", required: true },
    street: { type: String, required: true },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

locationSchema.index({ coordinates: "2dsphere" });

const specialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 250,
      unique: true, // still ensures uniqueness at DB level
    },
    image: {
      type: String, // store Cloudinary URL or path
      default: "", // optional field
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const fabricSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" }, // Cloudinary URL
    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rejectReason: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const measurementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true, // unique globally
    },
    type: {
      type: String,
      enum: ["top_wear", "bottom_wear", "common"],
      required: true,
    },
    unit: {
      type: String,
      enum: ["cm", "inch"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const measurementPointSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, enum: ["cm", "inch"], required: true },
    required: { type: Boolean, default: true },
  },
  { _id: false } // no separate _id for each point
);

const measurementTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    garmentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
      required: true,
    },
    description: { type: String },
    image: [{ type: String }], // Cloudinary URLs
    measurementPoints: [measurementPointSchema],
  },
  { timestamps: true, versionKey: false }
);


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    description: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Category = mongoose.model("Category", categorySchema);

export const MeasurementTemplate = mongoose.model("MeasurementTemplate",measurementTemplateSchema);

export const Measurement = mongoose.model("Measurement", measurementSchema);

export const Fabric = mongoose.model("Fabric", fabricSchema);

export const Specialty = mongoose.model("Specialty", specialtySchema);

const LocationMaster = mongoose.model("LocationMaster", locationSchema);
export default LocationMaster;

export const Country = mongoose.model("Country", countrySchema);
export const City = mongoose.model("City", citySchema);
