const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ObjectId = Schema.ObjectId;
const Review = require("./review");
const Post = require("./post");
const Wish = require("./wish");
const UserWish = require("./user-wish");

const UserSchema = mongoose.Schema(
  {
    auth0_user_id: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    description: {
      type: String,
    },
    age: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
        default: [],
      },
    ],
    posts: [
      {
        type: ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual("wishes", {
  ref: "UserWish",
  localField: "_id",
  foreignField: "userId",
});

UserSchema.pre("remove", function (next) {
  Post.remove({ author: this._id }).exec();
  Review.remove({ userId: this._id }).exec();
  next();
});

module.exports = new mongoose.model("User", UserSchema);
