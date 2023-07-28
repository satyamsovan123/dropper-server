const { logger } = require("../../../utils/logger");
const {
  errorResponseBuilder,
  successResponseBuilder,
} = require("../../../utils/responseBuilder");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const serverConstants = require("../../../constants/serverConstants");
const formConstants = require("../../../constants/formConstants");

const { dateFormatter } = require("../../../utils/dateFormatter");
const { readMetadata } = require("../../../utils/readMetadata");
const { addMetadata } = require("../../../utils/addMetadata");
const { log } = require("console");
const { RequestSerializer } = require("../../models/RequestSerializer.model");

const storageOptions = multer.diskStorage({
  destination: serverConstants.LOCATION,
  filename: (req, file, cb) => {
    const newFilename = `${file.originalname}`;
    cb(null, newFilename);
  },
});
const uploader = multer({ storage: storageOptions });

const uploadFiles = async (req, res) => {
  let response = {
    data: {},
    message: serverConstants.UPLOAD_SUCCESSFUL,
    code: 200,
  };
  try {
    uploader.any()(req, res, async (err) => {
      if (err) {
        console.log(err);
        response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_UPLOADING}`;
        response.code = 500;
        let generatedResponse = errorResponseBuilder(response);
        return res.status(generatedResponse.code).send(generatedResponse);
      }

      if (!req.files || req.files.length === 0) {
        console.log("No files uploaded");
        response.message = formConstants.INVALID_FILES;
        response.code = 400;
        let generatedResponse = successResponseBuilder(response);
        return res.status(generatedResponse.code).send(generatedResponse);
      }
      let generatedResponse = successResponseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    });
  } catch (error) {
    logger(error);
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_UPLOADING}`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const uploadMetadata = async (req, res) => {
  let response = {
    data: {},
    message: serverConstants.METADATA_GENERATION_SUCCESSFUL,
    code: 200,
  };
  try {
    const rawData = req.body;

    const formattedRequest = new RequestSerializer(
      rawData.name,
      rawData.deviceIdentity,
      rawData.passphrase,
      rawData.timeStamp,
      rawData.autoDelete
    );

    const validationResult = formattedRequest.validate();
    if (!validationResult.isValid) {
      response.message = `${validationResult.message}`;
      response.code = 400;
      let generatedResponse = errorResponseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const request = formattedRequest.build();

    const newMetadata = {
      author: request.name,
      deviceIdentity: request.deviceIdentity,
      passphrase: request.passphrase,
      timeStamp: dateFormatter(request.timeStamp),
      autoDelete: request.autoDelete,
    };

    console.log(newMetadata);

    const files = fs.readdirSync(`${serverConstants.LOCATION}`);
    console.log(files);

    files.forEach(async (file) => {
      try {
        console.log("adding metadata to file: ", file);
        await addMetadata(file, newMetadata);
      } catch (error) {
        console.error("Error while processing file:", file, error);
      }
    });

    response.data = newMetadata;
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_UPLOADING}`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { uploadMetadata, uploadFiles };
