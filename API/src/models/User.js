const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		name: String,
        lastname : String,
	    photo: String,
		sex: String,
	    address: String,
		phone: Number,
		email: String,
		password : String,
		listLike: Array,
    },
	{
		timestamps: true,
		collection: "User",
		versionKey: false,
	}
);

module.exports = mongoose.model("Users", User);