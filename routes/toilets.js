const express = require("express");
const Toilet = require('../models/Toilet'); // Adjust this path accordingly


const { getToilets, addToilets } = require("../controllers/toilets");

const router = express.Router();

router.route("/")
	.get(getToilets)
	.post(addToilets);

module.exports = router;



router.route("/rateToilet").post(async (req, res) => {
	try {
		const jsonBody = JSON.parse(JSON.stringify(req.body));

		const toiletId = jsonBody?.toiletId; // ?. = nullish coalesing operator | retorna el valor del JSON o undefined si no está presente
		const userRating = jsonBody?.userRating;

		const toilet = await Toilet.findOne({ toiletId: toiletId })
		if (!toilet) {
			return res.status(404).json({ error: "Toilet not found" });
		}

		const userIP = req.socket.remoteAddress;
		// Check if the user has previously rated this toilet
		const toiletRatings = toilet?.ratings ?? []; // ?? = si el primer valor es undefined o nulo, usará el segundo

		const userPreviousRating = toiletRatings.find((r) => r.ip === userIP);

		// Update the rating if found, else add a new rating entry
		if (userPreviousRating) {
			userPreviousRating.score = userRating;
		} else {
			toiletRatings.push({ ip: userIP, score: userRating });
		}

		toilet.ratings = toiletRatings;

		console.log(toilet)

		// Save the updated toilet data
		await toilet.save();

		// Send a success response
		res.status(200).json({
			success: true,
			message: "Rating added/updated successfully!",
		});
	} catch (error) {
		console.error(error)
	}
});