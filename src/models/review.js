const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = Schema.ObjectId;

const ReviewSchema = mongoose.Schema({
    id: {
        type: ObjectId,
    },
    postId: {
        type: ObjectId,
        ref: 'Post',
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
    },
    date: {
      type: Date,
      default: Date.now
    },
    votes: {
        type: Number,
        default: 0,
    }
});

module.exports = new mongoose.model("Review", ReviewSchema)