const { logger } = require("../../../utils/logger");

const {
  errorResponseBuilder,
  successResponseBuilder,
} = require("../../../utils/responseBuilder");
const serverConstants = require("../../../constants/serverConstants");

const getData = async (req, res) => {
  let response = {
    data: {},
    message: `get`,
    code: 200,
  };
  try {
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstants.GENERIC_ERROR_MESSAGE_WHILE_FETCHING}.`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getData };
