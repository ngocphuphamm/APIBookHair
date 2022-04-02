const mongoose = require("mongoose");

const LichHen = new mongoose.Schema(
	{
        user : String,
        nhanvien : String,
        dichvu : String,
        salon : String,
    },
	{
		timestamps: true,
		collection: "LichHen",
		versionKey: false,
	}
);

module.exports = mongoose.model("LichHen", LichHen);