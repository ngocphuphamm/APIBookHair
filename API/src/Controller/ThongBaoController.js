const ThongBao = require("../models/ThongBao");
class ThongBaoController
{
    //[GET] /getThongBao
    async getThongBao(req,res,next)
    {
        console.log("da vao");
        const thongbao =  await    ThongBao.find({"user_id" : req.params.id});
        res.send({  
            "success" : true , 
            "thongBao" :thongbao
        })
    }
}
module.exports = new ThongBaoController();