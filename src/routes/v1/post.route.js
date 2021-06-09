const express = require('express');
const auth = require('../../middlewares/auth');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router.route('/').post(auth('managePosts'), postController.createPost).get(auth('getPosts'), postController.getPosts);

router
  .route('/:postId')
  .get(auth('getPosts'), postController.getPost)
  .patch(auth('managePosts'), postController.updatePost)
  .delete(auth('managePosts'), postController.deletePost);

module.exports = router;
