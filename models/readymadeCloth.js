import mongoose from "mongoose";

const { Schema } = mongoose;

const readymadeClothSchema = new Schema(
  {
    tailorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    garmentType: { type: Schema.Types.ObjectId, ref: "Specialty", required: true },
    gender: { type: String, enum: ["male", "female", "unisex"], required: true },
    fabric: { type: Schema.Types.ObjectId, ref: "Fabric", required: true },
    colors: [{ type: String, required: true }],
    measurements: { type: String, required: true, trim: true },
    description: { type: String },
     images: [{ type: String }], 
    isActive: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const ReadymadeCloth = mongoose.model("ReadymadeCloth", readymadeClothSchema);

export default ReadymadeCloth;
