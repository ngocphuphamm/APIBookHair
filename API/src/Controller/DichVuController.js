
const Salon = require("../models/Salon");
const DichVu = require("../models/DichVu");

var ObjectId = require("mongodb").ObjectID;
class DichVuController {
  //[GET] /api/getDichvu
  async getDichvu(req, res, next) {
    try{
      const listDichVurefSalon = await DichVu.find({});

      res.send({
        success: true,
        dichvu: listDichVurefSalon,
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

  //[get] /api/getDichVuBySalon
  async getDichVuBySalon(req, res, next) {

    const salon = await Salon.findOne({ id: req.params.id });
    
    const dichvu = await DichVu.find({ tenSalon: salon.tenSalon });
   
    res.send({
      success: true,
      dichvu: dichvu,
    });
  }
    //[get] /api/dichvu/getChiTietDV
  async getChiTietDV(req,res,next)
  {
    try{
        const idDichVu = req.params.idDichVu;
        const ctDichVu = await DichVu.findOne({"id":idDichVu});
        const salon = await Salon.findOne({"tenSalon" : ctDichVu.tenSalon});
        let customData = {
          id_salon : salon.id,
          tenDichvu : ctDichVu.tenDichvu,
          giaTien : ctDichVu.giaTien,
          thoiGian : ctDichVu.thoiGian,
          hinhanh : ctDichVu.hinhanh
        }
        res.status(200).json({
          success: true,
          dichvu : [customData]
        })
    }
    catch(err)
    {
      res.status(404).json({
          success: false,
          msg : err.message
      })
    }

      
  }

  async getDVNoiBat(req,res,next)
  {
    try{
      const listDichVurefSalon = await DichVu.find({"noiBat":"1"});

      res.send({
        success: true,
        dichvu: listDichVurefSalon,
      });
    }
    catch(err){
        res.status(404).json({
          success : false,
          msg : err.message
        })
    }
  }
}

module.exports = new DichVuController();
