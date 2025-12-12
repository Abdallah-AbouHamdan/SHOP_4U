import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    accountType: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },

    // If seller -> link to store
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
