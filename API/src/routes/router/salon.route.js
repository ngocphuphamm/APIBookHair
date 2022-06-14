const express = require("express");
const router = express.Router();

const salonController = require("../../Controller/SalonController");


router.get("/getInfoSalon/:id", salonController.getInfoSalon);
router.post("/getSalon", salonController.getSalon)
router.get("/getSalonFeature", salonController.getSalonFeature);
router.get("/getSalonById/:id", salonController.getSalonById);


module.exports = router; 