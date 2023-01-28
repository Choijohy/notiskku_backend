const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/verifyToken');

const { getAccessToken, getRefreshToken } = require('../controllers/getToken');
const { User } = require('../models');

router.get('', async(req,res,next)=>{
    // no access token
    if (!req.headers['access-token']){ 
        return res.status(401).json({
            loginsuccess : false,
            message : "No aceess token. Login again"
        })}

    // no refresh token
    if (!req.headers['refresh-token']){ 
        return res.status(401).json({
            loginsuccess : false,
            message : "No refresh token. Login again"
        })}

            
    const verified_access = verifyToken(req.headers['access-token']);
    const verified_refresh=  verifyToken(req.headers['refresh-token']);

    if (verified_access === null){
        if (verified_refresh === null){
            // case 1: Both access token and refresh token are expired
            return res.status(401).json({
                loginsuccess : false,
                message: "Tokens are expired. Login again"
            });
        } else{ 
            // case 2: access token is expired , refresh token isn't expired 
            const userinfo = await User.findOne({
                where : {RefreshToken:req.headers['refresh-token']},
                attributes : ['id','SnsId'],
            });
            // new access token creation
            const id = userinfo.id;
            const snsid = userinfo.snsid;
            const new_accessToken = await getAccessToken(id,snsid);
            return res.statue(401).json({
                loginsuccess : false,
                message : "access token is expired.",
                new_access:new_accessToken
            });
        }
    } 
    else {
        console.log(verified_refresh,verified_access.snsid);
        // cased 3: access token is not expired, refresh token is expred
        if(verified_refresh === null){
            const new_refreshToken = await getRefreshToken();
            const existUser = await User.update({
                RefreshToken:new_refreshToken,
            },{where : {SnsId:verified_access.snsid}})
            res.send({new_refreshToken:new_refreshToken});
        }
        else{
            //case 4: access token, refresh token -> valid (login success)
            

        }
        
    }
        

    //     }
    // } else {
    //     // case3: access token은 유효하지만, refresh token은 만료된 경우
    //     if(refreshToken == undefined){
    //         const newRefreshToken = getRefreshToken();

    //         const user = await User.update({

    //         })
    //     }
    // }

})

module.exports = router;