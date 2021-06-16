/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const util = require('util');
const multer = require('multer');
// const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + "/resources/static/assets/uploads/");
    cb(null, __basedir + '/uploads/');
  },
  filename: (req, file, cb) => {
    console.log('original name ' + file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
