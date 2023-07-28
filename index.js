const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const formConstants = require("./constants/formConstants");
const serverConstants = require("./constants/serverConstants");
const { logger } = require("./utils/logger");
const { dateFormatter } = require("./utils/dateFormatter");
const { readMetadata } = require("./utils/readMetadata");
const { addMetadata } = require("./utils/addMetadata");
const { verifyRequest } = require("./middlewares/verifyRequest");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storageOptions = multer.diskStorage({
  destination: serverConstants.LOCATION,
  filename: (req, file, cb) => {
    const newFilename = `${file.originalname}`;
    cb(null, newFilename);
  },
});
const uploader = multer({ storage: storageOptions });

app.get("/", (req, res) => {
  try {
    res.send("Dropper server is working.").status(200);
  } catch (error) {
    logger(error);
    res.send("Dropper server is not working").status(500);
  }
});

app.get("/website", (req, res) => {
  try {
    res.sendFile("index.html", { root: "public" });
  } catch (error) {
    logger(error);
    res.send("Dropper server is not working").status(500);
  }
});

app.post("/upload-data", uploader.any(), async (req, res) => {
  let response = {
    message: "",
    data: [],
  };
  try {
    if (!req.files || req.files.length === 0) {
      response.message = formConstants.INVALID_FILES;
      return res.status(400).send(response);
    }

    const parsedData = JSON.parse(req.body.formData);

    if (!parsedData.name || parsedData.name.length === 0) {
      response.message = formConstants.INVALID_NAME;
      return res.status(400).send(response);
    } else if (
      !parsedData.deviceIdentity ||
      parsedData.deviceIdentity.length === 0
    ) {
      response.message = formConstants.INVALID_DEVICE_IDENTITY;
      return res.status(400).send(response);
    } else if (!parsedData.timeStamp || parsedData.timeStamp.length === 0) {
      response.message = formConstants.INVALID_TIMESTAMP;
      return res.status(400).send(response);
    } else if (
      parsedData.passphrase !== "" &&
      parsedData.passphrase.length <= 4
    ) {
      response.message = formConstants.INVALID_PASSPHRASE;
      return res.status(400).send(response);
    } else if (typeof parsedData.autoDelete !== "boolean") {
      response.message = formConstants.INVALID_PASSPHRASE;
      return res.status(400).send(response);
    }

    const newMetadata = {
      author: parsedData.name,
      deviceIdentity: parsedData.deviceIdentity,
      passphrase: parsedData.passphrase,
      timeStamp: dateFormatter(parsedData.timeStamp),
      autoDelete: parsedData.autoDelete,
    };

    // Attach metadata to the uploaded files

    const files = req.files;
    files.forEach((file) => {
      // console.log("_----------------------------");

      addMetadata(file, newMetadata)
        .then((success) => {
          console.log("File metadata added successfully.");
        })
        .catch((error) => {
          console.error("Error metadata add:", error);
        });
      // console.log("_----------------------------");
    });

    logger([req.body, req.files, parsedData, newMetadata]);

    response.message = formConstants.SAVE_SUCCESS;
    return res.status(201).send(response);
  } catch (error) {
    logger(error);
    response.message = serverConstants.GENERIC_ERROR_MESSAGE_WHILE_UPLOADING;
    return res.status(500).send(response);
  }
});

app.get("/get-data", (req, res) => {
  try {
    const files = fs.readdirSync("files");
    files.forEach((file) => {
      readMetadata(file)
        .then((metadata) => {
          console.log(file);
          console.log("File metadata:", metadata);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
    res.send("meta");
  } catch (error) {
    logger(error);
    res.send("Error uploading file.");
  }
});

app.get("/get-deletion-time", (req, res) => {
  try {
    res.status(200).send({ data: 10, message: "success" });
  } catch (error) {
    logger(error);
    res.send("Error uploading file.");
  }
});

app.listen(port, () => {
  logger(`Server running at http://localhost:${port}`);
});
