const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ObjectId = Schema.ObjectId;
const User = require("./user");

const WishSchema = mongoose.Schema(
  {
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
    },
    lastPrices: [
      {
        type: Number,
        default: [],
      },
    ],
    currentPrice: {
      type: Number,
    },
    currency: {
      type: String,
    },
    productId: {
      type: String,
    },
    url: {
      type: String,
    },
    hasProblem: {
      type: Boolean,
      default: false,
    },
    outOfStock: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

WishSchema.virtual("users", {
  ref: "UserWish",
  localField: "_id",
  foreignField: "wishId",
});

module.exports = new mongoose.model("Wish", WishSchema);
