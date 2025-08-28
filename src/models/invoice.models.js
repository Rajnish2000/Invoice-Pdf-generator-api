import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const InvoiceSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   products: [ProductSchema],
//   total: Number,
//   gst: Number,
//   grandTotal: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

export const Product = mongoose.model("Product", ProductSchema);
