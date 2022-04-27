const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const {networkInterfaces} = require("os")

const bodyParser = require("body-parser");
const port = 4000;

const route = require("./routes/index");

const path = require('path')


app.use(express.static(path.join(__dirname, 'public')));


// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/APIBOOKHAIR", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

app.use(express.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
// app.use("/public", express.static("public"));

const db = require('../src/config/index');
// connect to db 
db.connect();

app.use(cookieParser());

route(app);

app.listen(port, () => {
	const nets = networkInterfaces();

    console.log(`server run in http:\/\/${nets["Wi-Fi"][1].address}:${port}`);
});