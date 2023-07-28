const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/data/getData");

router.get("/get-data", getData);

module.exports = router;
