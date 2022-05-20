const User = require("../models/User");
const jwt_decode = require("jwt-decode");
class UserController {
  // [POST] /api/save_user_info
  async saveInfoUser(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const idUser = jwt_decode(token)._id;
    await User.updateOne(
      { _id: idUser },
      {
        $set: req.body,
      }
    );
    const user = await User.findById(idUser);
    res.send({
      success: true,
      user: user,
    });
  }
  // [GET] /api/logout
  async logOut(req, res, next) {
    res.send({
      success: true,
    });
  }

  //[GET] /api/showInfoUser
  async showInfoUser(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const idUser = jwt_decode(token)._id;
    const user = await User.findById(idUser);
    res.send({
      success: true,
      user: user,
    });
  }
}
module.exports = new UserController();
