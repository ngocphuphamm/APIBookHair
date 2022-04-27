const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Salon = require("../models/Salon");
const DichVu = require("../models/DichVu");
const YeuThich = require("../models/YeuThich");
var ObjectId = require("mongodb").ObjectID;
// const cloudinary = require("../utils/cloudinary");
class SiteController {
  //[GET] /api/getSalon
  async getSalon(req, res, next) {
  
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
      success: true,
      salon: listSalons,
    });
  }

  //[GET] /api/getSalonFeature
  async getSalonFeature(req, res, next) {

    const listSalonFeature = await Salon.find({ noibat: 1 });
    res.send({
      success: true,
      salon: listSalonFeature,
    });
  }

  //[GET] /api/getSalonById/:id
  async getSalonById(req, res, next) {
    const id = req.params.id;
    const favorite = await YeuThich.findOne({ user_id: id });
    if (favorite) {
      const salon = await Salon.findOne({ id: favorite["salon_id"] });
      const customData = {
        _id: salon._id,
        id: salon.id,
        tenSalon: salon.tenSalon,
        chuTiem: salon.chuTiem,
        diaChi: salon.diaChi,
        hinhAnh: salon.hinhAnh,
        rating: salon.rating,
        noibat: salon.noibat,
        selfLove: true,
      };
      res.send({
        success: true,
        salon: [customData],
      });
    } else {
      const customData = {
        selfLove: false,
      };
      res.send({
        success: true,
        salon: [customData],
      });
    }
  }
}

module.exports = new SiteController();
