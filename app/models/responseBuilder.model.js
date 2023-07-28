const serverConstants = require("../../constants/serverConstants");

class ResponseBuilder {
  data = {};
  message = serverConstants.GENERIC_SERVER_ERROR_MESSAGE;
  code = 500;

  constructor(
    data = {},
    message = serverConstants.GENERIC_SERVER_ERROR_MESSAGE,
    code = 500
  ) {
    this.data = data;
    this.message = message;
    this.code = code;
  }

  build() {
    let response = {
      data: this.data,
      message: this.message,
      code: this.code,
    };
    return response;
  }
}

module.exports = { ResponseBuilder };
