const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { storeService, userService, postService } = require('../services');

const createStore = catchAsync(async (req, res) => {
  const store = await storeService.createStore(req.body);

  const storeId = store.id;
  const hasStore = true;
  const body = { storeId, hasStore };

  const user = await userService.updateUserById(req.body.storeOwnerId, body);
  const result = { store, user };

  res.status(httpStatus.CREATED).send(result);
});

const getStores = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['storeName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await storeService.queryStores(filter, options);
  res.send(result);
});

const getStore = catchAsync(async (req, res) => {
  const store = await storeService.getStoreById(req.params.userId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'store not found');
  }
  res.send(store);
});

const getAllStorePost = catchAsync(async (req, res) => {
  const store = await storeService.getStoreById(req.params.userId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'store not found');
  }

  const posts = await postService.getAllPostsByOwnerId(req.params.userId);
  if (posts.length < 1) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'You have no posts yet' });
  }

  const storePosts = { store, posts };

  res.send(storePosts);
});

const updateStore = catchAsync(async (req, res) => {
  const store = await storeService.updateStoreById(req.params.userId, req.body);
  res.send(store);
});

const followStore = catchAsync(async (req, res) => {
  const response = await storeService.followStoreById(req.body);
  res.send(response);
});

const deleteStore = catchAsync(async (req, res) => {
  await storeService.deleteStoreById(req.params.userId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
  followStore,
  getAllStorePost,
};
