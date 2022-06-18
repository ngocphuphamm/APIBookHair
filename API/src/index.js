const express = require("express");
const app = express();
const { networkInterfaces } = require("os");
const {PORT} = require("./config/config");
const loaders = require("../src/load/index");
loaders(app);
app.listen(PORT,() => {

    console.log(`Connect server on port http://localhost:${PORT}`);
});