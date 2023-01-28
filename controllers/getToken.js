const jwt = require('jsonwebtoken');
require("dotenv").config();

// jwt.sign - 토큰 생성 

module.exports={
    getRefreshToken(){
        const refreshToken = jwt.sign({},
        process.env.JWT_SECRET, {
        expiresIn: '14d',
        issuer: 'skkud'
    })
    // console.log(refreshToken);
    return refreshToken;
    },

    getAccessToken(userid,snsid){
        const accessToken = jwt.sign({
            userid: userid,
            snsid: snsid,
          }, process.env.JWT_SECRET, {
            expiresIn: '1h',
            issuer: 'skkud',
          });
        return accessToken;
    }
}