const express = require("express");
const router = express.Router();
const userController = require("../../Controller/UserController");

router.post("/save_user_info",userController.saveInfoUser);
router.post("/saveUserInfoRegister",userController.saveInfoUserRegister);
router.get("/show_info_user",userController.showInfoUser);



module.exports = router; 