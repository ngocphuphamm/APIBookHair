const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Salon = require('../models/Salon');
const DichVu = require('../models/DichVu');
// const cloudinary = require("../utils/cloudinary");
class SiteController {
	// [POST] /api/login
	async Login(req, response, next) {
		console.log("da vao ");
		const email = req.body.email.toLowerCase();
		const password = req.body.password;

		const user = await User.findOne({ email: email, password: password })
		if (!user) {
			return response.send({
				"success": false,
			})
		}
		else {
			var token = jwt.sign({
				_id: user.id
			}, 'mk', {
				expiresIn: '1800000' // expires in 24 hours
			});
			return response.send({
				"success": true,
				"token": token,
				"user": user
			})
		}
	}
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

	async getSalonFeature(req, res, next) {
		console.log("da vao salon dac trung ");
		const listSalonFeature = await Salon.find({ "noibat": 1 });
		res.send({
			"success": true,
			"salon": listSalonFeature
		});
	}

	async getDichvu(req, res, next) {
		console.log("join dich vu  ")
		const listDichVurefSalon = await DichVu.find({})
			
									
		res.send({
			 "success": true,
			 "dichvu": listDichVurefSalon
		});

	}

}

;

module.exports = new SiteController();