const express = require('express');
const router = express.Router();

const nhanvienController = require("../../Controller/NhanVienController");

router.get("/getNhanVienBySalon/:time,:idsalon,:iddichvu",nhanvienController.getNhanVienBySalon);

module.exports = router;