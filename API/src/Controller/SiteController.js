const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Salon = require('../models/Salon');
// const cloudinary = require("../utils/cloudinary");
class SiteController {
	// [POST] /api/login
	async Login(req,response,next)
	{
		console.log("da vao ");
		const email = req.body.email.toLowerCase() ;
		const password = req.body.password ;

		const user = await  User.findOne({ email: email,password: password})
		if(!user)
		{
			return response.send({
				"success" : false,
			})
		}
		else
		{
			var  token = jwt.sign({
				_id : user.id
			},'mk');
			return response.send({
				"success" : true,
				"token" : token ,
				"user" : user
			})
		}

	}
	//[GET] /api/getSalon
	async getSalon(req,res,next)
	{
		console.log("da vao");
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
			"salon" : listSalons});
	}
}

;

module.exports = new SiteController();