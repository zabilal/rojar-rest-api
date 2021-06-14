const fs = require('fs');
const uploadFile = require('../middlewares/upload');

const baseUrl = 'https://rojar-api.herokuapp.com/v1/uploads/';

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    res.status(200).send({
      message: { image: `https://rojar-api.herokuapp.com/v1/uploads/${req.file.fileName}` },
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = `../../uploads/`;

  fs.readdir(directoryPath, function (err, files) {
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

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = '../../uploads/';

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: `Could not download the file. ${err}`,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     let filetype = '';
//     if (file.mimetype === 'image/png') {
//       filetype = 'png';
//     }
//     if (file.mimetype === 'image/jpeg') {
//       filetype = 'jpg';
//     }
//     cb(null, `image-${Date.now()}.${filetype}`);
//   },
// });

// const upload = multer({ storage }).single('images');

// const uploadImages = async (req, res) => {
//   upload(req, res);
//   // console.log(req.file);
//   if (!req.file) {
//     res.status(500).send({ message: 'Invalid file' });
//   }

//   if (req.file === undefined) {
//     return res.status(400).send({ message: 'Please upload a file!' });
//   }
//   // eslint-disable-next-line prefer-template
//   res.send({ fileUrl: 'https://rojar-api.herokuapp.com/v1/uploads/' + req.file.filename });
// };

// module.exports = {
//   uploadImages,
// };
