const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Salon = require("../models/Salon");
const DichVu = require("../models/DichVu");
const YeuThich = require("../models/YeuThich");
var ObjectId = require("mongodb").ObjectID;
class YeuThichController {
  //[POST] /api/YeuThich
  async postYeuThich(req, res, next) {

    const yeuthichsearch = await YeuThich.findOne({
      salon_id: req.body.id,
      user_id: req.body.userId,
    });

    if (yeuthichsearch) {
      // // const userId = yeuthichsearch['user_id'];
      // const user = await User.findOne({'_id': new ObjectId(userId)})
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
}
module.exports = new YeuThichController();
