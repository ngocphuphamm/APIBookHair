
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Salon = require('../models/Salon');
const DichVu = require('../models/DichVu');
const YeuThich = require('../models/YeuThich');
var ObjectId = require('mongodb').ObjectID;
class DichVuController{
    //[GET] /api/getDichvu
	async getDichvu(req, res, next) {
		console.log("join dich vu  ")
		const listDichVurefSalon = await DichVu.find({})


		res.send({
			"success": true,
			"dichvu": listDichVurefSalon
		});

	}
}

module.exports = new DichVuController();