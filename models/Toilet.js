const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const ToiletSchema = new mongoose.Schema({
	toiletId: {
		type: String,
		required: [true, "Please add store ID"],
		unique: true,
		trim: true,
		maxlenght: [10, "Store ID must be less than 10 characters"],
	},
	address: {
		type: String,
		required: [true, "Please add an address"],
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
		},
		coordinates: {
			type: [Number],
			index: "2dsphere",
		},
		formattedAddress: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	// new schema for rating
	ratings: [
		{
			ip: String,
			score: Number,
		},
	],
});

// gecode and create location
ToiletSchema.pre("save", async function (next) {
	const loc = await geocoder.geocode(this.address);
	this.location = {
		type: "Point",
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
	};

	//Do not save address
	this.address = undefined;
	next();
});

module.exports = mongoose.model("Toilet", ToiletSchema);
