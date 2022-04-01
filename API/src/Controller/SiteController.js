const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const cloudinary = require("../utils/cloudinary");
class SiteController {
	async Login(req,res,next)
	{
		const email = req.body.email.toLowerCase() ;
		const password = req.body.password ;

		const user = await  User.findOne({ email: email,password: password})
		if(!user)
		{
			return res.status(202).json({
				"success" : false,

			})
		}
		else
		{
			var  token = jwt.sign({
				_id : user.id
			},'mk');
			return res.status(404).json({
				"success" : true,
				"token" : token ,
				"user" : user
			})
		}

	}

}

;

module.exports = new SiteController();