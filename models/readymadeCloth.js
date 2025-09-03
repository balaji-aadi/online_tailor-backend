import mongoose from "mongoose";

const { Schema } = mongoose;

const readymadeClothSchema = new Schema(
  {
     tailorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    specialty: { type: Schema.Types.ObjectId, ref: "Specialty", required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    fabric: { type: Schema.Types.ObjectId, ref: "Fabric", required: true },
    colors: [{ type: String, required: true }],
    measurements: { type: String, required: true, trim: true },
    description: { type: String },
    images: { type: [String], default: [] }, 
    stock_qty: { type: Number, default: 0, min: 0 },
    taxMaster: { type: Schema.Types.ObjectId, ref: "TaxMaster" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ReadymadeCloth = mongoose.model("ReadymadeCloth", readymadeClothSchema);

export default ReadymadeCloth;
