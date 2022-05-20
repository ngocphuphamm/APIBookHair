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

  //[POST] /api/register
  async register(req,res,next)
  { 
      const isUserRegister = await User.findOne({ email :req.body.email})
      if(isUserRegister)
      {
          res.send({ success: false})
      }
      else
      {

          const email = await req.body.email ;
          const  password = await  req.body.password;

         var token = jwt.sign(
          {
             email,
             password
          },
          "mk",
          {
            expiresIn: "90d", // expires in 24 hours
          }
        );
         const data = {  
           name : "",
           lastname : "",
           photo : "avatar1.png",
           phone : 0 ,
           address : "",
           isLoggedIn : true,
         }
         res.send({ success: true , user : data,token :token });
      }
  }



}
module.exports = new UserController();
