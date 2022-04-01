const express = require("express");
const router = express.Router();

const siteController = require("../Controller/SiteController");



router.post("/login",siteController.Login);

router.get("/",(req,res,next)=>{
    res.send("hello");
})

module.exports = router;