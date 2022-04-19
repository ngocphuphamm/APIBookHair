const mongoose = require("mongoose");
const User = require("../models/User");
const LichHen = new mongoose.Schema(
	{
		id_salon  : Number , 
		id_user : { type : String ,ref : User},
		id_NhanVien : Number , 
		id_DichVu  : Number ,
		thanhTien : String ,
		thoiGian : String,
		status : String , 
		ngayHen : Date
		
    },
	{
		timestamps: true,
		collection: "LichHen",
		versionKey: false,
	}
);

module.exports = mongoose.model("LichHen", LichHen);