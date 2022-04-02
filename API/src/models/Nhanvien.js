const mongoose = require("mongoose");

const NhanVien = new mongoose.Schema(
	{
		 salon : String ,
         dichvu : [],
         lichhen : String,

    },
	{
		timestamps: true,
		collection: "NhanVien",
		versionKey: false,
	}
);

module.exports = mongoose.model("NhanVien", NhanVien);