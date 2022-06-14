const express = require('express');
const router = express.Router();

const lichhenController = require("../../Controller/LichHenController");



router.post("/DatLich",lichhenController.postDatLich);
router.get("/getLichHenSapToi/:id",lichhenController.getLichHenSapToi);
router.get("/getLichDaDat/:id",lichhenController.getLichDaDat);
router.get("/getLichHenDaDuyet/:id",lichhenController.getLichHenDaDuyet);

module.exports = router;