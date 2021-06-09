const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const storeSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      required: false,
      trim: true,
    },
    storeDescription: {
      type: String,
      required: false,
      trim: true,
    },
    storeAddress: {
      type: String,
      required: false,
      trim: true,
    },
    storeOwnerId: {
      type: String,
      required: false,
      trim: true,
    },
    storePhone: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    country: {
      type: String,
      required: false,
      trim: true,
    },
    customers: {
      type: Array,
      required: false,
      trim: true,
    },
    followers: {
      type: Array,
      required: false,
      trim: true,
    },
    visitors: {
      type: Array,
      required: false,
      trim: true,
    },
    likes: {
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
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

// postSchema.pre('save', async function (next) {
//   const post = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

/**
 * @typedef Store
 */
const Store = mongoose.model('Stores', storeSchema);

module.exports = Store;
