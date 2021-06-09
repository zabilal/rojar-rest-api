const express = require('express');
const auth = require('../../middlewares/auth');
const storeController = require('../../controllers/store.controller');

const router = express.Router();

router.route('/').post(auth('manageStores'), storeController.createStore).get(auth('getStores'), storeController.getStores);

router
  .route('/:storeId')
  .get(auth('getStores'), storeController.getStore)
  .patch(auth('manageStores'), storeController.updateStore)
  .delete(auth('manageStores'), storeController.deleteStore);

module.exports = router;
