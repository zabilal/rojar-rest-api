const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const storeRoute = require('./store.route');
const docsRoute = require('./docs.route');
const uploadRoute = require('./upload.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/stores', storeRoute);
router.use('/docs', docsRoute);
router.use('/file', uploadRoute);

module.exports = router;
