const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Salon = require('../models/Salon');
const DichVu = require('../models/DichVu');
const YeuThich = require('../models/YeuThich');
var ObjectId = require('mongodb').ObjectID;
// const cloudinary = require("../utils/cloudinary");
class SiteController {
	
	//[GET] /api/getSalon
	async getSalon(req, res, next) {
		console.log("da vao salon");
		const listSalons = await Salon.find();
		// for(var i =0 ; i < listSalons.length ; i++)
		// {

		// 	if(listSalons[i].id > listSalons[i+1].id)
		// 	{
		// 		let temp = listSalons[i].id;
		// 		listSalons[i].id = listSalons[i+1].id
		// 		listSalons[i+1].id = temp;
		// 	}
		// }
		// await	listSalons.forEach((el)=>{
		// 	let totalRating =0 ;
		// 	let countRating = 0 ; 
		// 	el['totalRating'] = totalRating;

		// 	el['countRating'] = countRating;
		// 	el['rating'] = 0 ;


		// })

		return res.send({
			"success": true,
			"salon": listSalons
		});
	}

	//[GET] /api/getSalonFeature
	async getSalonFeature(req, res, next) {
		console.log("da vao salon dac trung ");
		const listSalonFeature = await Salon.find({ "noibat": 1 });
		res.send({
			"success": true,
			"salon": listSalonFeature
		});
	}


	//[GET] /api/getSalonById/:id
	async getSalonById(req,res,next)
	{
		const id = req.params.id
		const salon = await  Salon.findOne({"id":id});
		res.send(salon);
	}


}



module.exports = new SiteController();