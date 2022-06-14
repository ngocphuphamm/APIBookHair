const expressLoader = require("./express");
const db = require("../config/db");

module.exports = async loadApp =>{
    expressLoader(loadApp);
    db.connect();
}