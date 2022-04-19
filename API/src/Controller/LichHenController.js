
const LichHen =  require("../models/LichHen");
class LichHenController{
    postDatLich(req,res,next)
    {
  
        const customData = {
            id_salon : req.body.id_salon,
            id_NhanVien : req.body.id_Nhanvien,
            id_DichVu : req.body.id_Dichvu,
            thoiGian : req.body.thoiGian,
            ngayHen : req.body.ngayHen,
        }
      
        const lichhien = new LichHen(customData);
        lichhien.save();
        
    }
}
module.exports = new LichHenController();