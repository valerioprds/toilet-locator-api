const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const rateToiletRoute = require("./routes/toilets.js"); // Adjust this path

// load env variables

dotenv.config({
	path: "./config/config.env",
});
// Connect to database

connectDB();

const app = express();

// body parser

app.use(express.json());

//enable cors
app.use(cors());

// set static folder

app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/v1/toilets", require("./routes/toilets"));


app.get('/', (req,res) => {
	res.send('la pagina de incio ')
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);
