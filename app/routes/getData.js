const express = require("express");
const router = express.Router();
const { getData, downloadFile } = require("../controllers/data/getData");

router.get("/get-data", getData);
router.post("/download-file", downloadFile);

module.exports = router;
