const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = Schema.ObjectId;
const Review = require('./review');

const PostSchema = Schema({
    id: {
        type: ObjectId,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
      type: Date,
      default: Date.now
    },
    votes: {
        type: Number,
        default: 0,
    },
    reviews: [{
        type: ObjectId,
        ref: 'Review',
        default: [],
    }],
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
});

PostSchema.pre('remove', function(next) {
    Review.remove({ postId: this._id }).exec();
    next();
});

module.exports = new mongoose.model("Post", PostSchema)