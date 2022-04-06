const mongoose = require("mongoose");
const Salon = require("../models/Salon");
const NhanVien = require("../models/Nhanvien");
const DichVu = new mongoose.Schema(
	{
		id : Number,
       	tenSalon : {type : String } ,
		id_NhanVien :{type : String ,ref:NhanVien},
        tenDichvu : String , 
        giaTien : String ,  
		hinhanh : String,
    },
	{
		timestamps: true,
		collection: "DichVu",
		versionKey: false,
	}
);

module.exports = mongoose.model("DichVu", DichVu);