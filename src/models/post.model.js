const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    amount: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    storeId: {
      type: String,
      required: false,
      trim: true,
    },
    instagramShare: {
      type: Boolean,
      required: false,
      trim: true, // used by the toJSON plugin
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    userImage: {
      type: String,
      required: false,
      trim: true,
    },
    pickupAddress: {
      type: String,
      required: false,
      trim: true,
    },
    postImage: {
      type: String,
      required: false,
      trim: true,
    },
    qty: {
      type: String,
      required: false,
      trim: true,
    },
    sizes: {
      type: Array,
      required: false,
      trim: true,
    },
    likes: {
      type: Array,
      required: false,
      trim: true,
    },
    ownerId: {
      type: String,
      required: false,
      trim: true,
    },
    viewedBy: {
      type: Array,
      required: false,
      trim: true,
    },
    customers: {
      type: Array,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
