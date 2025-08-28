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
    city: { type: Schema.Types.ObjectId, ref: "Location", required: true }, 
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

const LocationMaster = mongoose.model("LocationMaster", locationSchema);
export default LocationMaster;

export const Country = mongoose.model("Country", countrySchema);
export const City = mongoose.model("City", citySchema);