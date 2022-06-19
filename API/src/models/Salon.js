const mongoose = require("mongoose");

const Salon = new mongoose.Schema(
	{
        id : { type : Number ,  default : 0 },
        tenSalon : String,
		chuTiem : String ,
        diaChi : String, 
        hinhAnh : String , 
        rating : Number, 
        noiBat : {type : Number , default : 0} ,
        GioiThieu : String,
        latitude : String ,
        longitude : String
  
    },
	{
		timestamps: true,
		collection: "Salon",
		versionKey: false,
	}
);

module.exports = mongoose.model("Salon", Salon);