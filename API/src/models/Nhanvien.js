const mongoose = require("mongoose");
const Salon = require("../models/Salon");
const NhanVien = new mongoose.Schema(
	{
		id_NhanVien : Number , 
		id_salon :  {type : Number , ref: Salon },
		hoTen :  String,
		diaChi : String , 
		soDienThoai : Number, 
		chucvu : String,
		id_DichVu : [] 
    },
	{
		timestamps: true,
		collection: "NhanVien",
		versionKey: false,
	}
);

module.exports = mongoose.model("NhanVien", NhanVien);