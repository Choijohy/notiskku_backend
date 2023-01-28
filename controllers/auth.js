const request = require('request');

module.exports = {
  getProfile(accessToken) {
    return new Promise((resolve, reject) => {
      request( 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          url: 'https://kapi.kakao.com/v2/user/me',
          method: 'GET',
        },
        (error, response, body) => {
          if (!error && response.statusCode === 200) {
            resolve(body);
          }
          reject(error);
        }
      );
    });
  },

const KakaoLogin = (req,res,next) => {
    try{
        let userEmail = "";
        let userNickName = "";
        if (req.body.access_token){
            // Kakao Login for the first time(signup)
            const result = await kakaoAuth.getProfile(req.body.access_token);
            const kakaoUser = JSON.parse(result).kakao_account;
            userEmail = kakaoUser.email;
            userNickName = kakaoUser.profile.nickname;
        } else {
            const usere = jwt.verify(req.headers.authorization,
                process.env.JWT_SECRET, {
                    ignoreExpiration : true,
                });
                userEmail = user.email;
        }
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:err.toString(),
        });
    }
}