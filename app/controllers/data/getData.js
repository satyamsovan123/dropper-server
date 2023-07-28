const { logger } = require("../../../utils/logger");
const fs = require("fs-extra");
const path = require("path");

const {
  errorResponseBuilder,
  successResponseBuilder,
} = require("../../../utils/responseBuilder");
const serverConstants = require("../../../constants/serverConstants");
const { readMetadata } = require("../../../utils/readMetadata");

const getData = async (req, res) => {
  let response = {
    data: [],
    message: serverConstants.FETCH_SUCCESSFUL,
    code: 200,
  };

  try {
    const files = fs.readdirSync(`${serverConstants.LOCATION}`);
    let metadata = [];

    for (const file of files) {
      try {
        if (file.startsWith(".DS_Store")) {
          continue;
        }
        metadata.push(await readMetadata(file));
      } catch (error) {
        console.error("Error while processing file:", file, error);
      }
    }

    response.data = metadata;
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    console.log(error);
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_FETCHING}`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const downloadFile = async (req, res) => {
  let response = {
    data: [],
    message: serverConstants.FETCH_SUCCESSFUL,
    code: 200,
  };

  try {
    const fileName = req.body.fileName;
    const filePath = path.resolve(
      path.join(serverConstants.LOCATION, fileName)
    );
    console.log(filePath);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.log("Error sending file:", err);
        response.message = serverConstants.UNABLE_TO_DOWNLOAD_FILE;
        response.code = 500;
        let generatedResponse = successResponseBuilder(response);
        return res.status(generatedResponse.code).send(generatedResponse);
      } else {
        response.message = serverConstants.UNABLE_TO_DOWNLOAD_FILE;
        response.code = 500;
        let generatedResponse = successResponseBuilder(response);
      }
    });
  } catch (error) {
    console.log(error);
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_FETCHING}`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getData, downloadFile };
