const mongoose = require("mongoose");

const LichHen = new mongoose.Schema(
	{
		id_salon  : Number , 
		id_NhanVien : Number , 
		id_DichVu  : Number ,
		thoiGian : String,
		ngayHen : Date
		
    },
	{
		timestamps: true,
		collection: "LichHen",
		versionKey: false,
	}
);

module.exports = mongoose.model("LichHen", LichHen);