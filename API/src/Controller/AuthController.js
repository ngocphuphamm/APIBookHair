const { generateAccessToken } = require("../function/function");
const User = require("../models/User");
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

  // [GET] /api/logout
  async logOut(req, res, next) {
    res.send({
      success: true,
    });
  }
}
module.exports = new AuthController();
