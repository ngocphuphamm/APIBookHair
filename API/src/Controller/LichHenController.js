
const DichVu = require("../models/DichVu");
const LichHen = require("../models/LichHen");
const ThongBao = require("../models/ThongBao");
const User = require("../models/User");
const NhanVien = require("../models/Nhanvien");
const Salon = require("../models/Salon");
var mongoose = require('mongoose');

class LichHenController {
    // quá trình lịch hẹn post dat lich vấn đề sao lấy được _id trong khi mới save xong 
    /* lichhen : {
                atribute: ....,
                "nhanvien" : {},
                "user" : {},
                "salon" : {},
    }*/

    async postDatLich(req, res, next) {
        const idDichVu = Number(req.body.id_Dichvu);
        const dichvu = await DichVu.findOne({ "id": idDichVu });

        const customData = {
            id_salon: req.body.id_salon,
            id_user: req.body.userId,
            id_NhanVien: req.body.id_Nhanvien,
            id_DichVu: req.body.id_Dichvu,
            thanhTien: dichvu['giaTien'],
            status: "Chưa xác nhận",
            thoiGian: req.body.thoiGian,
            ngayHen: req.body.ngayHen,
        }



        const customDataThongBao = {
            user_id: req.body.userId,
            id_DichVu: req.body.id_Dichvu,
            salon_id: req.body.id_salon,
            nhanVien_id: req.body.id_Nhanvien,
            noiDung: "Đặt lịch thành công",
            chiTietNoiDung: "Lịch Cắt Ngày" + req.body.ngayHen + "thành công tại" + dichvu['tenSalon']
        }


        const lichhen = new LichHen(customData);
        await lichhen.save(() => {
            console.log("thanh cong");
        });


        const thongbao = await new ThongBao(customDataThongBao);
        await thongbao.save();

        const idNhanVien = Number(req.body.id_Nhanvien);
        const nhanvien = await NhanVien.findOne({ "id_NhanVien": idNhanVien });

        const idSalon = Number(req.body.id_salon);
        const salon = await Salon.findOne({ "id": req.body.id_salon });

        const idUser = mongoose.Types.ObjectId(req.body.userId);

        const user = await User.findById(idUser);
        const idLichHen = lichhen['id_NhanVien'];

        const customDataReturn = {
            "id": idLichHen,
            "status": lichhen['status'],
            "ngayHen": req.body.ngayHen,
            "nhanvien": nhanvien,
            "salon": salon,
            "user": user
        };
        console.log(customDataReturn);
        res.send({
            "success": true,
            "message": "Dat lich thanh cong",
            "lichhen": customDataReturn
        })


    }
    
    async getLichHenSapToi(req,res,next)
    {
        const array = [];
        function dateToYMD(date) {
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        }
        
        const  lichhen = await LichHen.find({"id_user":req.body.userId,"status":"Chưa xác nhận"});
        lichhen.forEach((el)=>{
            const ngayhen =  dateToYMD(el['ngayHen']);
            const dataCustom = {
                "id_salon": el['id_salon'],
                "id_user": el['id_user'],
                "id_NhanVien": el['id_NhanVien'],
                "id_DichVu":el['id_DichVu'],
                "thanhTien": el['thanhTien'],
                "thoiGian":el['thoiGian'],
                "status" : el['status'],
                "ngayHen": ngayhen
            }
            array.push(dataCustom);
        })
        res.send({
            "success":true,
            "lichhen" : dataCustom
        });
;    
    }   
}
module.exports = new LichHenController();