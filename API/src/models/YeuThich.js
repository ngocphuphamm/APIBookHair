const mongoose = require("mongoose");
const Salon = require("../models/Salon");
const NhanVien = require("../models/Nhanvien");
const YeuThich = new mongoose.Schema(
	{
		user_id : {type : String},
        salon_id : {type: String},
		selfLove : Boolean,
    },
	{
		timestamps: true,
		collection: "YeuThich",
		versionKey: false,
	}
);

module.exports = mongoose.model("YeuThich", YeuThich);