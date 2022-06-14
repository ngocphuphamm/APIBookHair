const express = require("express");
const route = require(".");
const router = express.Router();

const siteController = require("../Controller/SiteController");
const authController = require("../Controller/AuthController");
const dichvuController = require("../Controller/DichVuController");
const yeuthichController = require("../Controller/YeuThichController");
const nhanvienController = require("../Controller/NhanVienController");
const lichhenController = require("../Controller/LichHenController");
const thongbaoController = require("../Controller/ThongBaoController");
const userController = require("../Controller/UserController");


router.get("/",(req,res)=>{
    res.send("API NGOC PHU")
})

router.post("/login",authController.Login);


router.get("/getInfoSalon/:id",siteController.getInfoSalon);
router.post("/getSalon",siteController.getSalon)
router.get("/getSalonFeature",siteController.getSalonFeature);
router.get("/getSalonById/:id",siteController.getSalonById);

router.get("/getDichvu",dichvuController.getDichvu)
router.get("/getDichVuBySalon/:id",dichvuController.getDichVuBySalon);

router.post("/YeuThich",yeuthichController.postYeuThich);


router.get("/getNhanVienBySalon/:time,:idsalon,:iddichvu",nhanvienController.getNhanVienBySalon);


router.post("/DatLich",lichhenController.postDatLich);
router.get("/getLichHenSapToi/:id",lichhenController.getLichHenSapToi);
router.get("/getLichDaDat/:id",lichhenController.getLichDaDat);
router.get("/getLichHenDaDuyet/:id",lichhenController.getLichHenDaDuyet);

router.get("/getThongBao/:id",thongbaoController.getThongBao);




router.post("/save_user_info",userController.saveInfoUser);
router.post("/saveUserInfoRegister",userController.saveInfoUserRegister);
router.get("/logout",userController.logOut);
router.get("/show_info_user",userController.showInfoUser);
router.get("/getListYeuThich", yeuthichController.getListYeuThich);
router.post("/register",userController.register);
module.exports = router; 