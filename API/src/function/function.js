const jwt = require("jsonwebtoken");
module.exports= {
    dateToYMD : (date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    },
    generateAccessToken :  (idUser) => {
        // tạo ra token
        return jwt.sign({ idUser }, "mySecretKey", {
            expiresIn: "90 days"
        });
    
    },
}     

