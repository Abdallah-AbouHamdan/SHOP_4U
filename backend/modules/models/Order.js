import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number
      }
    ],

    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },

    confirmationCode: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
