const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ObjectId = Schema.ObjectId;

const UserWishSchema = mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  wishId: { type: ObjectId, ref: "Wish", required: true },
  notificationEnable: { type: Boolean, default: false },
  maxPrice: { type: Number },
});

module.exports = new mongoose.model("UserWish", UserWishSchema);
