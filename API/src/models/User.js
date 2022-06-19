const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		name: String,
        lastname : String,
	    photo: String,
		phone: String,
	    email: String,
		password : String,
		address: String,
    },
	{
		timestamps: true,
		collection: "User",
		versionKey: false,
	}
);

module.exports = mongoose.model("Users", User);