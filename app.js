const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./app/routes");
const cors = require("cors");

const serverConstants = require("./constants/serverConstants");
const { logger } = require("./utils/logger");

const port = serverConstants.PORT;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  logger(`${serverConstants.SERVER_STATUS} at ${port}.`);
});
