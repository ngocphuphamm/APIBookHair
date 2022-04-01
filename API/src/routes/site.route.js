const express = require("express");
const router = express.Router();

const siteController = require("../Controller/SiteController");



router.get("/",siteController.getAllSite);


module.exports = router;