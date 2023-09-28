const mongoose = require("mongoose");
//const geocoder = require("../utils/geocoder");

const ToiletSchema = new mongoose.Schema({
	toiletId: {
		type: String,
		required: [true, "Please add store ID"],
		unique: true,
		trim: true,
		maxlenght: [10, "Store ID must be less than 10 characters"],
	},
	/* address: {
		type: String,
		required: [true, "Please add an address"],
	}, */
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


	ratings: [
        {
            ip: String,       // Dirección IP del usuario que calificó
            score: Number     // Calificación proporcionada por el usuario
        }
    ]
	// new schema for rating
/* 	ratings: [
		{
			ip: {
				type: String,
				unique: true,
				required: [true, "Please add user ip"]
			},
			score: Number,
		}
	] */
});

// gecode and create location
ToiletSchema.pre("save", async function (next) {
	//const loc = await geocoder.geocode(this.address);
	

	//Do not save address
	next();
});

module.exports = mongoose.model("Toilet", ToiletSchema);
