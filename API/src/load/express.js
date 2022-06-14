const bodyParser = require("body-parser");
const routeAPI = require("../routes/index");
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors')
const express = require('express');
module.exports = app => {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(cookieParser());
    app.use("/api",routeAPI);
}





