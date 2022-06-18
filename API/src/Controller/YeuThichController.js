const Salon = require("../models/Salon");
const YeuThich = require("../models/YeuThich");
const jwt_decode = require("jwt-decode");
class YeuThichController {
  //[POST] /api/YeuThich
  async postYeuThich(req, res, next) {
    try{
      const yeuthichsearch = await YeuThich.findOne({
        salon_id: req.body.id,
        user_id: req.body.userId,
      });
      if (yeuthichsearch) {
        const idYeuThich = await yeuthichsearch["_id"];
        await YeuThich.deleteOne({ _id: idYeuThich });
        res.send({
          success: true,
          message: "unloved",
        });
      } else {
        const data = {
          user_id: req.body.userId,
          salon_id: req.body.id,
        };
  
        const yeuthichCreate = await new YeuThich(data);
        await yeuthichCreate.save();
        res.send({
          success: true,
          message: "loved",
          yeuthich: yeuthichCreate,
        });
      }
    }
    catch(err)
    {
      res.status(404).json({
        success : false,
        msg : err

      })
    }
   
  }
  async getListYeuThich(req, res, next) {
    try{
      const idUser = jwt_decode(req.headers.authorization.split(" ")[1]).idUser;
      const yeuthich = await YeuThich.find({ user_id: idUser });
      let array = [];
      await Promise.all(
        await yeuthich.map(async (el) => {
          const id = Number(el["salon_id"]);
          const salonEntity = await Salon.findOne({ id: id });
          let salon = {
            id: salonEntity["id"],
            hinhAnh: salonEntity["hinhAnh"],
            tenSalon: salonEntity["tenSalon"],
          };
  
          await array.push({ "salon" : salon});
        })
      );
  
      res.send({
        "success": true,
        yeuthich : array
      })
    }
    catch(err)
    {
        res.status(404).json({ 
          success: false,
          msg : err
        })
    }
   
  }
}
module.exports = new YeuThichController();
