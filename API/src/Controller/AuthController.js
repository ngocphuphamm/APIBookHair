const { generateAccessToken } = require("../function/function");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
class AuthController {
  // [POST] /api/login
  async Login(req, response, next) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return response.send({
        success: false,
      });
    } else {
      var token = generateAccessToken(user.id);

      return response.send({
        success: true,
        userId: user.id,
        token: token,
        user: user,
      });
    }
  }
  //[POST] /api/register
  async register(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const isUserRegister = await User.findOne({ email: req.body.email })
      if (isUserRegister) {
        res.status(200).json({ success: false })
      }
      else {
        const customData = {
          name: "",
          lastname: "",
          phone: 0,
          photo: "avartar1.png",
          email: email,
          password: password,
          address: "",
        }
        const user = new User(customData);
        user.save();
        const token = generateAccessToken(user._id);
        console.log(user._id);
        res.status(200).json({ success: true, user: user, token: token, isLoggedIn: true });
      }
    }
    catch (err) {
      res.status(404).json({
        success: false,
        msg: err.message
      })
    }


  }

  // [GET] /api/logout
  async logOut(req, res, next) {
    res.send({
      success: true,
    });
  }
}
module.exports = new AuthController();
