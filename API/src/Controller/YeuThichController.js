const Salon = require("../models/Salon");
const YeuThich = require("../models/YeuThich");
const jwt_decode = require("jwt-decode");
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
  async getListYeuThich(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const idUser = jwt_decode(token)._id;
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
}
module.exports = new YeuThichController();
