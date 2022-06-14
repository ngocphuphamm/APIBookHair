const User = require("../models/User");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");

class UserController {
  //[POST] /api/saveInfoUserRegister
  async saveInfoUserRegister(req,res,next)
  {
    const token = req.headers.authorization.split(" ")[1];
    const email = jwt_decode(token).email;
    const customData = {
            name : req.body.name,
            lastname : req.body.lastname,
            phone : req.body.phone,
            photo : "avartar1.png",
            email : email,
            password : jwt_decode(token).password,
            address : req.body.address,
            
          }
          const newUser = await new User(customData);
          await  newUser.save();
          console.log(newUser);
          res.send({
            success : true,
            user : newUser,
            photo : "avatar1.png"
          })
  }
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
