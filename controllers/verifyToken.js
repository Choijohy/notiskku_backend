const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    verifyToken(token){
        try {
            return jwt.verify(token,process.env.JWT_SECRET);
        } catch(err){
            if(err.message == "jwt expired"){return null}
            else if(err.message == "invalid token"){return null}
            else {return err.message;}
        }  
    }
}
    
