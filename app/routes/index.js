const express = require("express");
const router = express.Router();
const serverConstants = require("../../constants/serverConstants");
const {
  errorResponseBuilder,
  successResponseBuilder,
} = require("../../utils/responseBuilder");

const baseURL = serverConstants.BASE_API;

router.use(baseURL, require("./getData"));
router.use(baseURL, require("./uploadData"));
router.use(baseURL, require("./deleteData"));
router.use(baseURL, require("./autoDelete"));

router.get("/", (req, res) => {
  let response = {
    data: {},
    message: `${serverConstants.SERVER_STATUS}.`,
    code: 200,
  };
  try {
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstants.GENERIC_SERVER_ERROR_MESSAGE}.`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

router.use("*", (req, res) => {
  let response = {
    data: {},
    message: `${serverConstants.PROVIDE_A_VALID_PATH} Use this to access this API - ${serverConstants.SERVER_URL}${baseURL}.`,
    code: 404,
  };

  try {
    let generatedResponse = successResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstants.GENERIC_SERVER_ERROR_MESSAGE}.`;
    response.code = 500;
    let generatedResponse = errorResponseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

module.exports = router;
