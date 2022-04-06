const express = require("express");
const route = require(".");
const router = express.Router();

const siteController = require("../Controller/SiteController");



router.post("/login",siteController.Login);

router.get("/",(req,res,next)=>{
    console.log("da vaoo");
    res.send("hello");
})

router.post("/getSalon",siteController.getSalon)

router.get("/getSalonFeature",siteController.getSalonFeature);
router.get("/getDichvu",siteController.getDichvu)

router.post("/YeuThich",siteController.postYeuThich)
module.exports = router;