const express = require("express");
const router = express.Router();

const { autoDelete, autoDeletionTime } = require("../controllers/autoDelete");

router.delete("/auto-delete", autoDelete);
router.get("/auto-delete", autoDeletionTime);

module.exports = router;
