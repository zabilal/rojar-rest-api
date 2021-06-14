const express = require('express');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router
  .route('/')
  // .post(uploadController.uploadImages, uploadController.resizeImages, uploadController.getResult)
  .post(uploadController.uploadImages)
  .get(uploadController.getListFiles);

module.exports = router;
