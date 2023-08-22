const express = require("express");

const { getToilets, addToilets } = require("../controllers/toilets");

const router = express.Router();

router.route("/").get(getToilets).post(addToilets);

module.exports = router;
