const { ResponseBuilder } = require("../app/models/responseBuilder.model");

const successResponseBuilder = (response) => {
  let successResponse = new ResponseBuilder(
    response.data,
    response.message,
    response.code
  );

  return successResponse.build();
};

const errorResponseBuilder = (response) => {
  let errorResponse = new ResponseBuilder(
    response.data,
    response.message,
    response.code
  );

  return errorResponse.build();
};

module.exports = { successResponseBuilder, errorResponseBuilder };
