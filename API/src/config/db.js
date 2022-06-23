// import mongoose 
const mongoose = require('mongoose');
const {MONGO_URL} = require("../config/config");
async function connect()
{
    try {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "APIBOOKHAIR",
        });
        console.log('Thành công') 
    }
    catch (error) {
        console.log('thất bại ')
    }

}
module.exports={connect};