import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },

    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },

    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Store", StoreSchema);
