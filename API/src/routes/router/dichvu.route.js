const express = require('express');
const router = express.Router();

const dichvuController = require("../../Controller/DichVuController");

router.get("/getDichvu",dichvuController.getDichvu)
router.get("/getDichVuBySalon/:id",dichvuController.getDichVuBySalon);




module.exports = router;