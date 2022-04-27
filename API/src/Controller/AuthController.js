const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Salon = require("../models/Salon");
const DichVu = require("../models/DichVu");
const YeuThich = require("../models/YeuThich");
var ObjectId = require("mongodb").ObjectID;
class AuthController {
  // [POST] /api/login
  async Login(req, response, next) {
    console.log("da vao ");
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      console.log("that bai");
      return response.send({
        success: false,
      });
    } else {
      console.log("thanh cong");
      var token = jwt.sign(
        {
          _id: user.id,
        },
        "mk",
        {
          expiresIn: "1800000", // expires in 24 hours
        }
      );

      return response.send({
        success: true,
        userId: user.id,
        token: token,
        user: user,
      });
    }
  }
}
module.exports = new AuthController();
