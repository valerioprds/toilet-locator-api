const Toilet = require("../models/Toilet");

//@ desc get all toilets
// route get /api/v1/toilets
// @access Public

exports.getToilets = async (req, res, next) => {
	try {
		const toilets = await Toilet.find();

		return res.status(200).json({
			success: true,
			count: toilets.length,
			data: toilets,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

//@ desc create a toilets
// route POST /api/v1/toilets
// @access Public

exports.addToilets = async (req, res, next) => {
	try {
		const toilet = await Toilet.create(req.body);

		return res.status(200).json({
			success: true,
			data: toilet,
		});
	} catch (error) {
		console.error(error);
		if (error.code === 11000) {
			return res
				.status(400)
				.json({ error: " This toilet already exists" });
		}
		res.status(500).json({ error: "Server error" });
	}
};
