const express = require('express');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router.route('/').post(uploadController.upload);
router.route('/').get(uploadController.getListFiles);
router.route('/d').get(uploadController.download);

module.exports = router;
