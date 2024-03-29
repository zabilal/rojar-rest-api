const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const baseUrl = 'https://rojar-api.herokuapp.com/v1/files/';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Maximum of 10 images allowed for upload
const uploadFiles = upload.array('images', 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.send('Too many files to upload.');
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.originalname.replace(/\..+$/, '');
      const newFilename = `${filename}-${Date.now()}.png`;

      await sharp(file.buffer).resize(640, 320).toFormat('png').png({ quality: 90 }).toFile(`uploads/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

const getResult = async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const host = req.host;
  // const filePath = req.protocol + '://' + host + '/' + req.file.path;

  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }

  const imageList = [];
  // const images = req.body.images.map((image) => '' + image + '').join('');
  req.body.images.map((image) => {
    // eslint-disable-next-line no-unused-expressions
    // eslint-disable-next-line prefer-template
    return imageList.push(req.protocol + '://' + host + '/v1/' + image);
    // return baseUrl + image;
  });

  return res.send(imageList);
};

const getListFiles = (req, res) => {
  const directoryPath = 'uploads/';

  fs.readFile(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
    }

    const fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

module.exports = {
  uploadImages,
  resizeImages,
  getResult,
  getListFiles,
};

// module.exports = {
//   uploadImages: uploadImages,
//   resizeImages: resizeImages,
//   getResult: getResult,
// };
