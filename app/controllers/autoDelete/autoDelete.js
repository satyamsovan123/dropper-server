const { logger } = require("../../../utils/logger");
const { AUTO_DELETION_TIME } = require("../../../configs/server.config");

const {
  errorResponseBuilder,
  successResponseBuilder,
} = require("../../../utils/responseBuilder");
const serverConstants = require("../../../constants/serverConstants");

const autoDelete = async (req, res) => {
  let response = {
    data: {},
    message: `auto delete actual deletion`,
    code: 200,
  };
  try {
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_UPLOADING}.`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const autoDeletionTime = async (req, res) => {
  let response = {
    data: {},
    message: `auto delete time`,
    code: 200,
  };
  try {
    response.data = AUTO_DELETION_TIME;
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_UPLOADING}.`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { autoDelete, autoDeletionTime };
