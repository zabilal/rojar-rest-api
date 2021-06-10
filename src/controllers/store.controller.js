const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { storeService } = require('../services');
const { userService } = require('../services');

const createStore = catchAsync(async (req, res) => {
  const store = await storeService.createStore(req.body);

  const storeId = store.id;
  const hasStore = true;
  const body = { storeId, hasStore };

  const userUpdate = await userService.updateUserById(req.body.storeOwnerId, body);
  const result = { store, userUpdate };

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

const updateStore = catchAsync(async (req, res) => {
  const store = await storeService.updateStoreById(req.params.userId, req.body);
  res.send(store);
});

const deleteStore = catchAsync(async (req, res) => {
  await storeService.deleteStoreById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
};
