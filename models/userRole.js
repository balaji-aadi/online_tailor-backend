import mongoose, { Schema } from "mongoose";

const userRoleSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 250,
        unique: true,
      },
      role_id: {
        type: Number,
        required: true,
        unique: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  userRoleSchema.pre("save", function (next) {
    this.name = this.name.toLowerCase().replace(" ", "");
    next();
});

export const UserRole = mongoose.model("UserRole", userRoleSchema);