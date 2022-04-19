
const DichVu = require("../models/DichVu");
const LichHen =  require("../models/LichHen");
const ThongBao = require("../models/ThongBao");
class LichHenController{
    // quá trình lịch hẹn post dat lich vấn đề sao lấy được _id trong khi mới save xong 
    /* lichhen : {
                atribute: ....,
                "nhanvien" : {},
                "user" : {},
                "salon" : {},
    }*/
    async postDatLich(req,res,next)
    {   
        const idDichVu = Number(req.body.id_Dichvu);
        const dichvu =  await DichVu.findOne({"id":idDichVu})
        
        const customData = {
            id_salon : req.body.id_salon,
            userId : req.body.userId,
            id_NhanVien : req.body.id_Nhanvien,
            id_DichVu : req.body.id_Dichvu,
            thanhTien : dichvu['giaTien'],
            status : "Chưa xác nhận",
            thoiGian : req.body.thoiGian,
            ngayHen : req.body.ngayHen,
        }

        const customDataThongBao = {
            user_id : req.body.userId,
            id_DichVu: req.body.id_Dichvu,
            salon_id : req.body.id_salon,
            nhanVien_id :  req.body.id_Nhanvien,
            noiDung : "Đặt lịch thành công",
            chiTietNoiDung : "Lịch Cắt Ngày" + req.body.ngayHen + "thành công tại" + dichvu['tenSalon']
        }
        
    
        const lichhen = await new LichHen(customData);
        await lichhen.save();
   
        const thongbao = await new ThongBao(customDataThongBao);
        await thongbao.save();
      
        // res.send({
        //     "success":true,
        //     "message":"Dat lich thanh cong",
        //     "lichhen":lichhen
        // })
     
        
    }
}
module.exports = new LichHenController();