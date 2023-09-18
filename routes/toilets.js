const express = require("express");
const Toilet = require('../models/Toilet'); // Adjust this path accordingly


const { getToilets, addToilets } = require("../controllers/toilets");

const router = express.Router();

router.route("/").get(getToilets).post(addToilets);

module.exports = router;

function getUserIP(req, res, next) {
	const userIP =
		req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	req.userIP = userIP;
	next();
}

router.post("/rateToilet", getUserIP, async (req, res) => {
	const toiletId = req.body.toiletId;
	const userRating = req.body.userRating;

	const toilet = await Toilet.findOne({ toiletId: toiletId });

	if (!toilet) {
		return res.status(404).json({ error: "Toilet not found" });
	}

	// Check if the user has previously rated this toilet
	const userPreviousRating = toilet.ratings.find((r) => r.ip === req.userIP);

	// Update the rating if found, else add a new rating entry
	if (userPreviousRating) {
		userPreviousRating.score = userRating;
	} else {
		toilet.ratings.push({ ip: req.userIP, score: userRating });
	}

	// Save the updated toilet data
	await toilet.save();

	// Send a success response
	res.status(200).json({
		success: true,
		message: "Rating added/updated successfully!",
	});
});
