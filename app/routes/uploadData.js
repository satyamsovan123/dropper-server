const express = require("express");
const router = express.Router();
const { uploadData } = require("../controllers/data/uploadData");

router.post("/upload-data", uploadData);

module.exports = router;
