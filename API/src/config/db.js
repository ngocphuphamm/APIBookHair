// import mongoose 
const mongoose = require('mongoose');
const {MONGO_URL} = require("../config/config");
async function connect()
{
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Thành công') 
    }
    catch (error) {
        console.log('thất bại ')
    }

}
module.exports={connect};