const User = require("../models/User");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");

class UserController {
  //[POST] /api/saveInfoUserRegister
  async saveInfoUserRegister(req,res,next)
  {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const idUser = jwt_decode(token).idUser;
      const customData = {
              name : req.body.name,
              photo : "avatar1.png",
              lastname : req.body.lastname,
              phone : req.body.phone,
              address : req.body.address,
       }
        const user = await User.updateOne(
          { _id: idUser },
          {
            $set: customData,
          }
        );
            res.status(200).json({
              success : true,
              user : user,
              photo : "avatar1.png"
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
  // [POST] /api/save_user_info
  async saveInfoUser(req, res, next) {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const idUser = jwt_decode(token).idUser;
      await User.updateOne(
        { _id: idUser },
        {
          $set: req.body,
        }
      );
      const user = await User.findById(idUser);
      res.status(200).json({
        success: true,
        user: user,
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


  //[GET] /api/showInfoUser
  async showInfoUser(req, res, next) {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const idUser = jwt_decode(token).idUser;
      const user = await User.findById(idUser);
      res.send({
        success: true,
        user: user,
      });
    }
    catch(err)
    {
      res.status(404).json({
        success : false,
        msg : err.message
      })
    }
   
  }





}
module.exports = new UserController();
