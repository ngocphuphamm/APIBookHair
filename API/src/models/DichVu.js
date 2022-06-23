const mongoose = require("mongoose");
const Salon = require("../models/Salon");
const NhanVien = require("../models/Nhanvien");
const DichVu = new mongoose.Schema(
	{
		id : Number,
		// // model này hơi ngu sau này cải thiện 
		// idSalon  : {type:String ,ref:NhanVien},
       	tenSalon : {type : String } ,
		id_NhanVien :{type : String ,ref:NhanVien},
        tenDichvu : String , 
        giaTien : String ,  
		hinhanh : String,
		thoiGian : Number,
		noiBat : {type : Number , default : 0} ,
    },
	{
		timestamps: true,
		collection: "DichVu",
		versionKey: false,
	}
);

module.exports = mongoose.model("DichVu", DichVu);