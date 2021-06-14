const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    let filetype = '';
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, `image-${Date.now()}.${filetype}`);
  },
});

const upload = multer({ storage }).single('images');

const uploadImages = async (req, res) => {
  upload(req, res);
  // console.log(req.file);
  if (!req.file) {
    res.status(500).send({ message: 'Invalid file' });
  }

  if (req.file === undefined) {
    return res.status(400).send({ message: 'Please upload a file!' });
  }
  // eslint-disable-next-line prefer-template
  res.send({ fileUrl: 'https://rojar-api.herokuapp.com/v1/uploads/' + req.file.filename });
};

module.exports = {
  uploadImages,
};
