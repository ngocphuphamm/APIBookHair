const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Salon = require("../models/Salon");
const YeuThich = require("../models/YeuThich");
var ObjectId = require("mongodb").ObjectID;
class SalonController {
  async getInfoSalon(req, res, next) {
    try {
      const idUser = jwt.decode(req.headers.authorization.split(" ")[1]).idUser;
      const idSalon = Number(req.params.id);
      const salon = await Salon.findOne({ "id": idSalon });
      const selfLove = await YeuThich.findOne({ "user_id": idUser, "salon_id": req.params.id }) === null ? false : true;
      res.status(200).json({
        "success": true,
        "salon": [salon],
        "selfLove": selfLove,
      })
    }
    catch (err) {
      console.log(err)
      res.status(404).json({
        success: false,
        err
      })
    }

  }


  //[GET] /api/getSalon
  async getSalon(req, res, next) {
    const listSalons = await Salon.find();
    return res.send({
      success: true,
      salon: listSalons,
    });
  }

  //[GET] /api/getSalonFeature
  async getSalonFeature(req, res, next) {
    try{
      const listSalonFeature = await Salon.find({ noiBat: 1 });
      res.send({
        success: true,
        salon: listSalonFeature,
      });
    }
    catch(err)
    {
      res.status(404).json({
        success: false,
        msg : err.message
      })
    }
   
  }

  //[GET] /api/getSalonById/:id
  async getSalonById(req, res, next) {
    try {
      const idUser = jwt.decode(req.headers.authorization.split(" ")[1]).idUser;
      const id_salon = req.params.id
      const favorite = await YeuThich.findOne({ user_id: idUser, salon_id: id_salon });
      const salon = await Salon.findOne({ id: id_salon });
      if (favorite) {
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
          _id: salon._id,
          id: salon.id,
          tenSalon: salon.tenSalon,
          chuTiem: salon.chuTiem,
          diaChi: salon.diaChi,
          hinhAnh: salon.hinhAnh,
          rating: salon.rating,
          noibat: salon.noibat,
          selfLove: false,
        };
        res.send({
          success: true,
          salon: [customData],
        });
      }

    }
    catch (err) {
      res.status(404).json({
        success: false,
        msg: err
      })
    }

  }
}

module.exports = new SalonController();
