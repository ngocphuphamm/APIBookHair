const mongoose = require("mongoose");

const DichVu = new mongoose.Schema(
	{
        salon : string ,
        nameDV : string , 
        price : Number 
    },
	{
		timestamps: true,
		collection: "DichVu",
		versionKey: false,
	}
);

module.exports = mongoose.model("DichVu", DichVu);