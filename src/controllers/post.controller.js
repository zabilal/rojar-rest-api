const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');
const { storeService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  if (req.body.storeId === null) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send();
  }

  const store = await storeService.getStoreById(req.body.storeId);
  const { body } = req;
  // eslint-disable-next-line dot-notation
  body['pickupAddress'] = store.storeAddress;
  // eslint-disable-next-line no-console
  console.log(body);

  const post = await postService.createPost(body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPosts(filter, options);
  res.send(httpStatus.OK).send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.userId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.status(httpStatus.OK).send(post);
});

const getPostsByUserId = catchAsync(async (req, res) => {
  const post = await postService.getAllPostsByOwnerId(req.params.userId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Posts not found');
  }
  res.status(httpStatus.OK).send(post);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.userId, req.body);
  res.status(httpStatus.OK).send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.userId);
  res.status(httpStatus.OK).send();
});

const likeDislikePost = catchAsync(async (req, res) => {
  const post = await postService.likeDislikePost(req.body);
  res.status(httpStatus.OK).send(post);
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPostsByUserId,
};
