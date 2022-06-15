
const salonRoute = require("./router/salon.route");
const dichvuRoute = require("./router/dichvu.route");
const authRoute = require("./router/auth.route");
const nhanvienRoute = require("./router/nhanvien.route");
const lichhenRoute = require("./router/lichhen.route");
const yeuthichRoute = require("./router/yeuthich.route");
const userRoute = require("./router/user.route");
const thongBaoRoute = require("./router/thongbao.route");
const express = require("express");
const router = express.Router();


router.use("/salon", salonRoute);
router.use("/dichvu",dichvuRoute);
router.use("/auth",authRoute);
router.use("/nhanvien",nhanvienRoute);
router.use("/lichhen",lichhenRoute);
router.use("/yeuthich",yeuthichRoute);
router.use("/user",userRoute);
router.use("/thongbao",thongBaoRoute);
module.exports = router;