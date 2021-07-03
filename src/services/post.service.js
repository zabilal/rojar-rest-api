// ignore no-plusplus

const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  const post = await Post.create(postBody);
  return post;
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  console.log('getting all posts for feeds');
  const posts = await Post.paginate(filter, options);
  return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return Post.findById(id);
};

/**
 * Get All Posts by ownerId
 * @param {string} ownerId
 * @returns {Promise<Post>}
 */
const getAllPostsByOwnerId = async (ownerId) => {
  console.log('lets fetch all users posts');
  return Post.findAll({ ownerId });
};

/**
 * Update Post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

/**
 * like and unlike Post by id
 * @param {ObjectId} postId
 * @param {Object} likeBody
 * @returns {Promise<Post>}
 */
const likeDislikePost = async (body) => {
  const { userId, postId } = body;
  const post = await getPostById(postId);

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    // return post;
  } else {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i] === userId) {
        post.likes.splice(i, 1);
      }
    }
  }
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
  likeDislikePost,
  getAllPostsByOwnerId,
};
