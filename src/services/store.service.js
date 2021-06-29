const httpStatus = require('http-status');
// const { get } = require('mongoose');
const { userService } = require('.');
const { Store } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Store
 * @param {Object} postBody
 * @returns {Promise<Store>}
 */
const createStore = async (postBody) => {
  const store = await Store.create(postBody);
  return store;
};

/**
 * Query for stores
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStores = async (filter, options) => {
  const stores = await Store.paginate(filter, options);
  return stores;
};

/**
 * Get store by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getStoreById = async (id) => {
  return Store.findById(id);
};

/**
 * Get Store by ownerId
 * @param {string} ownerId
 * @returns {Promise<Store>}
 */
const getStoreByOwnerId = async (ownerId) => {
  return Store.findOne({ ownerId });
};

/**
 * Update Store by id
 * @param {ObjectId} storeId
 * @param {Object} updateBody
 * @returns {Promise<Store>}
 */
const updateStoreById = async (storeId, updateBody) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(store, updateBody);
  await store.save();
  return store;
};

/**
 * Follow  and unfollow Store by id
 * @param {Object} body
 * @returns {Promise<Store>}
 */
const followStoreById = async (body) => {
  const { userId, storeId } = body;

  const store = await getStoreById(storeId);
  const user = await userService.getUserById(userId);

  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!store.followers.includes(userId)) {
    store.followers.push(userId);
    user.followings.push(storeId);
  } else {
    for (let i = 0; i < store.followers.length; i++) {
      if (store.followers[i] === userId) {
        store.followers.splice(i, 1);
      }
    }
    for (let j = 0; j < user.followings.length; j++) {
      if (user.followings[j] === storeId) {
        user.followings.splice(j, 1);
      }
    }
  }
  await store.save();
  await user.save();

  const response = { user, store };

  return response;
};

/**
 * Delete store by id
 * @param {ObjectId} storeId
 * @returns {Promise<Store>}
 */
const deleteStoreById = async (storeId) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await store.remove();
  return store;
};

module.exports = {
  createStore,
  queryStores,
  getStoreById,
  getStoreByOwnerId,
  updateStoreById,
  followStoreById,
  deleteStoreById,
};
