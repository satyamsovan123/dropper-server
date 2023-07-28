const { logger } = require("../../../utils/logger");
const {
  errorResponseBuilder,
  successResponseBuilder,
} = require("../../../utils/responseBuilder");
const serverConstants = require("../../../constants/serverConstants");

const deleteData = async (req, res) => {
  let response = {
    data: {
      name: "Hello delete",
    },
    message: "Delete called!",
    code: 200,
  };
  try {
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstants.GENERIC_DELETION_ERROR_MESSAGE}.`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { deleteData };
