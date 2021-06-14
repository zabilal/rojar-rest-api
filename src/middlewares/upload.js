const util = require('util');
const multer = require('multer');
// const maxSize = 2 * 1024 * 1024; //file size

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../uploads/');
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage,
  // limits: { fileSize: maxSize }, limiting size of uploaded files
}).single('images');

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
