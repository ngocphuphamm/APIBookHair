const NhanVien = require("../models/Nhanvien");
class NhanVienController {
  async getNhanVienBySalon(req, res, next) {
    const idSalon = req.params.idsalon;
    const iddichvu = Number(req.params.iddichvu);

    const listNhanVien = await NhanVien.find({ id_salon: idSalon });
    const nhanvien = await listNhanVien.filter((el) => {
      const dichvu = el.id_DichVu;
      const sentinel = dichvu.find((el) => {
        return el === iddichvu;
      });
      if (sentinel) {
        return el;
      } else {
        return [];
      }
    });

    res.send({
      success: true,
      nhanvien: nhanvien,
    });
  }
}

module.exports = new NhanVienController();
