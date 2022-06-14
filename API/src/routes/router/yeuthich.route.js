const express = require('express');
const router = express.Router();

const yeuthichController = require("../../Controller/YeuThichController");

router.get("/getListYeuThich", yeuthichController.getListYeuThich);
router.post("/YeuThich",yeuthichController.postYeuThich);





module.exports = router;