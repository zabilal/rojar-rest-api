/* eslint-disable no-undef */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
const fs = require('fs');
const uploadFile = require('../middlewares/upload');

// const baseUrl = 'https://rojar-api.herokuapp.com/v1/';
const baseUrl = 'http://localhost:3000/v1/file/';

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    res.status(200).send({
      message: `Uploaded the file successfully: ${baseUrl}${req.file.originalname}`,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 2MB!',
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  // const directoryPath = __basedir + "/resources/static/assets/uploads/";
  const directoryPath = __basedir + '/uploads/';

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
    }

    // eslint-disable-next-line prefer-const
    let fileInfos = [];

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
  // const directoryPath = __basedir + "/resources/static/assets/uploads/";
  const directoryPath = __basedir + '/uploads/';

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
