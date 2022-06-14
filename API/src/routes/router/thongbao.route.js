const express = require("express");
const router = express.Router();
const thongBaoController = require("../../Controller/ThongBaoController");


router.get("/getThongBao/:id",thongBaoController.getThongBao);



module.exports = router; 