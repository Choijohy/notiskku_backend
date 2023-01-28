const express = require('express');
const router = express.Router();
const request = require('request-promise');
const { getRefreshToken,getAccessToken } = require('../controllers/getToken');
const getToken = require('../controllers/getToken');
const { User } = require('../models');


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query['code']);
  res.json({accessCode:req.query['code']});
});


router.get('/token',async function(req, res, next){
    try{
    // ----------------------------kakao test 필요------------
    //request info for kakao
    const params_from_req = req.body['params'];
    const grant = params_from_req['grant_type'];
    const id = params_from_req['client_id'];
    const redir = params_from_req['redirect_uri'];
    const code = params_from_req['code'];
    

    // request to kakao
    const options = {
        uri: "https://kauth.kakao.com/oauth/token",
        method: "POST",
        form:{
            grant_type : grant,
            client_id :id,
            redirect_uri:redir,
            code: code
        },
        headers: {
            "content-type" : "application/x-www-form-urlencoded"
        },
        json: true
    }

    //response from the kakao : user info
    const data = await request(options , function(error, res, body){
        return res;
    })
    console.log(data);

    // ----------------------------kakao test 필요------------
    

    //token 생성
    const resfreshToken = await getRefreshToken();
    const userid = req.body.userid; //수정
    const snsid = data.snsid; //수정
    const accessToken = await getAccessToken(userid,snsid); //수정
       
    

    // check if the user exist
    const kakaoId = data.id ;

    const user = await User.findOne({
        where: {SnsId:req.body.snsid} //수정
    });
    
    if (!user){
        // 신규 회원 등록
        const newUser = await User.create({
            StudentId : "", 
            username : "",
            Major1 : "",
            AppNoticeOn : 0,
            SnsId : req.body.snsid,  // 수정
            ResfreshToken : refreshToken,
        })
        res.send({User:newUser, accessToken:accessToken});
    } else{
        // token 재발급
        const existUser = await User.update({
            RefreshToken:refreshToken,
        },{where : {SnsId:req.body.snsid}})
        res.json({refreshToken:refreshToken, accessToken:accessToken});
    }
    } catch(error){
        console.error(error);
        next(error);
    }

//   res.json(data);
});




//test용
router.get('/token/test',async(req,res,next)=>{
    
    const user = await User.findOne({
        where: {SnsId:req.body.snsid} //수정 from kakao
    });
    
    if (!user){
        // return res.status(200).json({
        //     message: "No user"
        // })
        //token
        const refreshToken = await getRefreshToken();
        // console.log(refreshToken); 
        const newUser = await User.create({
            StudentId : "0",
            UserName : "0", // from kakao
            Email : "aaa", // from kakao
            Major1 : "",
            AppNoticeOn : 0,
            SnsId : req.body.snsid,  // 수정
            RefreshToken : refreshToken,
        })
        const userid = newUser.userid; //수정
        const snsid = newUser.snsid; //수정 from kakao
        const accessToken = await getAccessToken(userid,snsid);
        res.send({User:newUser, accessToken:accessToken});
    } else{
        // token 재발급

        const existUser = await User.findOne({
            where:{SnsId:req.body.snsid},
            attributes:['UserId']
        })
        const refreshToken = await getRefreshToken();
        const userid = existUser; //수정
        const accessToken = await getAccessToken(userid,req.body.snsid);

        const existUser_newToken = await User.update({
            RefreshToken:refreshToken,
        },{where : {SnsId:req.body.snsid}})
        res.json({refreshToken:refreshToken, accessToken:accessToken});
    }
})
module.exports = router;