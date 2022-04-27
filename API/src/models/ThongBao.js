const mongoose = require("mongoose");

const ThongBao = new mongoose.Schema(
	{
       user_id : String,
       salon_id : Number , 
	   nhanVien_id : Number , 
       noiDung  : String, 
       chiTietNoiDung : String ,
    },
	{
		timestamps: true,
		collection: "ThongBao",
		versionKey: false,
	}
);

module.exports = mongoose.model("ThongBao", ThongBao);