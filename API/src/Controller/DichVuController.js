const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Salon = require("../models/Salon");
const DichVu = require("../models/DichVu");
const YeuThich = require("../models/YeuThich");
var ObjectId = require("mongodb").ObjectID;
class DichVuController {
  //[GET] /api/getDichvu
  async getDichvu(req, res, next) {
  
    const listDichVurefSalon = await DichVu.find({});

    res.send({
      success: true,
      dichvu: listDichVurefSalon,
    });
  }

  //[get] /api/getDichVuBySalon
  async getDichVuBySalon(req, res, next) {

    const salon = await Salon.findOne({ id: req.params.id });

    const dichvu = await DichVu.find({ tenSalon: salon.tenSalon });

    res.send({
      success: true,
      dichvu: dichvu,
    });
  }
}

module.exports = new DichVuController();
