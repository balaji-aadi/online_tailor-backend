import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const { Schema } = mongoose;

const measurementSchema = new Schema(
  {
    height: { type: Number },       // in cm
    weight: { type: Number },       // in kg
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    shoulder: { type: Number },
    armLength: { type: Number },
    inseam: { type: Number },
    otherMeasurements: { type: Map, of: Number }, // for any custom measurements
  },
  { _id: false }
);

const customerSchema = new Schema(
  {
    user_role: { type: Schema.Types.ObjectId, ref: "UserRole", required: true },
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    status: { type: String, enum: ["Approved", "Deactivated"], default: "Approved" },
    dob: { type: Date },
    address: { type: String },
    city: { type: Schema.Types.ObjectId, ref: "City", default: null },
    country: { type: Schema.Types.ObjectId, ref: "Country", default: null },
    gender: { type: String, enum: ["male", "female", "others"] },
    age: { type: Number },
    emiratesId: { type: String },  // Cloudinary URL
    profilePicture: { type: String }, // Cloudinary URL
    measurements: measurementSchema,

    // ---------------- Coordinates ----------------
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  { timestamps: true, versionKey: false }
);

// 🔐 Password hashing before save
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Password check method
customerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Customer", customerSchema);
