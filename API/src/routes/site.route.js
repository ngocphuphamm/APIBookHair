const express = require("express");
const route = require(".");
const router = express.Router();

const siteController = require("../Controller/SiteController");
const authController = require("../Controller/AuthController");
const dichvuController = require("../Controller/DichVuController");
const yeuthichController = require("../Controller/YeuThichController");
const nhanvienController = require("../Controller/NhanVienController");
const lichhenController = require("../Controller/LichHenController");
router.post("/login",authController.Login);

router.get("/",(req,res,next)=>{
    console.log("da vaoo");
    res.send("hello");
})

router.post("/getSalon",siteController.getSalon)
router.get("/getSalonFeature",siteController.getSalonFeature);
router.get("/getSalonById/:id",siteController.getSalonById);

router.get("/getDichvu",dichvuController.getDichvu)
router.get("/getDichVuBySalon/:id",dichvuController.getDichVuBySalon);

router.post("/YeuThich",yeuthichController.postYeuThich);


router.get("/getNhanVienBySalon/:time,:idsalon,:iddichvu",nhanvienController.getNhanVienBySalon);


router.post("/DatLich",lichhenController.postDatLich);
router.get("/getLichHenSapToi",lichhenController.getLichHenSapToi);

module.exports = router; 