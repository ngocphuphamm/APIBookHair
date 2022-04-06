const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Salon = require('../models/Salon');
const DichVu = require('../models/DichVu');
const YeuThich = require('../models/YeuThich');
var ObjectId = require('mongodb').ObjectID;
// const cloudinary = require("../utils/cloudinary");
class SiteController {
	// [POST] /api/login
	async Login(req, response, next) {
		console.log("da vao ");
		const email = req.body.email.toLowerCase();
		const password = req.body.password;

		const user = await User.findOne({ email: email, password: password })
		if (!user) {
			console.log("that bai")
			return response.send({
				"success": false,
			})
		}
		else {
			console.log("thanh cong");
			var token = jwt.sign({
				_id: user.id
			}, 'mk', {
				expiresIn: '1800000' // expires in 24 hours
			});
		
			return response.send({
				"success": true,
				"userId" : user.id,
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

	async postYeuThich(req, res, next) {
		console.log(req.body);
		 const yeuthichsearch = await YeuThich.findOne({ "salon_id": req.body.id,"user_id":req.body.userId });
	
		if(yeuthichsearch)
		{
			console.log("da co yeu thichj")
			// // const userId = yeuthichsearch['user_id'];
			// const user = await User.findOne({'_id': new ObjectId(userId)})
			const idYeuThich = await yeuthichsearch['_id'];
		    await YeuThich.deleteOne({'_id': idYeuThich })
			res.send({
				"success": true,
				"message" : "unloved"
			})
		}
		else
		{
			console.log("chua co yeu thich");
			const data = {
				"user_id" : req.body.userId,
				"salon_id" : req.body.id
			}
			
			const yeuthichCreate = await new YeuThich(data);
			await yeuthichCreate.save();
			res.send({
				"success":true,
				"message": "loved",
				"yeuthich": yeuthichCreate
			})

		}
	
		

		
	}

}

;

module.exports = new SiteController();