const express = require("express");
const router = express.Router();
const {
  uploadMetadata,
  uploadFiles,
} = require("../controllers/data/uploadData");

router.post("/upload-metadata", uploadMetadata);
router.post("/upload-files", uploadFiles);

module.exports = router;
