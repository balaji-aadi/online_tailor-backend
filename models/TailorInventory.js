import mongoose, { Schema } from "mongoose";

const tailorInventorySchema = new Schema(
  {
    tailor: { type: Schema.Types.ObjectId, ref: "User", required: true }, // tailorId
    fabric: { type: Schema.Types.ObjectId, ref: "Fabric", required: true }, // fabricId
    colors: [{ type: String, required: true }], // hex codes from color picker
    price: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const TailorInventory = mongoose.model("TailorInventory", tailorInventorySchema);
export default TailorInventory;
