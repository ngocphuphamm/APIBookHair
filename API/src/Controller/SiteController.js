const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const cloudinary = require("../utils/cloudinary");
class SiteController {
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

}

;

module.exports = new SiteController();