const express = require("express");
const router = express.Router();
const { deleteData } = require("../controllers/data/deleteData");

router.post("/delete-data", deleteData);

module.exports = router;
