const NhanVien = require("../models/Nhanvien");
const LichHen = require("../models/LichHen")
const moment = require("moment");
class NhanVienController {
  async getNhanVienBySalon(req, res, next) {
    try {
      const idSalon = req.params.idsalon;
      const iddichvu = Number(req.params.iddichvu);
      const time = req.params.time;
      const date = req.params.date;
      let nhanvienListDichVu = [];
      let nhanvienChuaCoLich = [];
      const listNhanVien = await NhanVien.find({ id_salon: idSalon });
      // list staff work service 
      await listNhanVien.map(async (el) => {
        const dichvu = el.id_DichVu;
        const sentinel = dichvu.find((el) => {
          return el === iddichvu;
        });
        if (sentinel) {
          nhanvienListDichVu.push(el);
        }
      });
      // get staff not have booking session
       let nhanvienListDichVuReal ;
      const data = nhanvienListDichVu.map(async (el) => {
        // get list booking be long to  staff 
        const lichhen = await LichHen.find({ "id_NhanVien": el.id_NhanVien }); 
        if (lichhen === []) {
          nhanvienListDichVuReal = Array.from(nhanvienListDichVu)
        }
        else {
          // loop booking if duplicate remove item in list staff 
          for(var i=0; i<lichhen.length;i++)
          {
            const ngayHen = moment(lichhen[i].ngayHen).format('YYYY-M-DD');
            if (ngayHen === date && lichhen[i].thoiGian === time) {
              const indexOfObject = nhanvienListDichVu.findIndex(object => {
                return object.id_nhanvien === lichhen[i].id_nhanvien;
              });
              nhanvienListDichVu.splice(indexOfObject, 1);
             }
          }
          nhanvienListDichVuReal = Array.from(nhanvienListDichVu)
       
        }
     })
      Promise.all(data)
      .then(()=>{
         res.status(200).json({
          success: true,
          nhanvien: nhanvienListDichVuReal,
        });
      })
    
    }
    catch (err) {
      res.status(404).json({
        success: false,
        msg: err.message
      })
    }

  }
}

module.exports = new NhanVienController();
