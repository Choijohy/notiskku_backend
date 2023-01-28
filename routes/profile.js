const express = require('express');
const router = express.Router();
const { User, Subscription } = require('../models');

router.get('/:userId',async(req, res, next)=>{
    const profile = await User.findOne({
        where:{UserId:req.params.userId},
        attributes: { exclude: ['Provider','SnsId',
        'createdAt','updatedAt','deletedAt','RefreshToken'] }
    })
    
    const subscription = await Subscription.findAll({
        where: {UserUserId:req.params.userId},
        attributes: ['SubscriptionId','CategoryCategoryId']
    })
    res.json({profile:profile, subscription:subscription})
})

router.patch('/:userId',async(req,res,next)=>{
    try{
        const updatedProfile = await User.update({
            UserId :  req.body.userId,
            StudentId: req.body.studentId,
            UserName : req.body.username,
            Email : req.body.email,
            Major1 : req.body.major1,
            Major2 : req.body.major2,
            Major3 : req.body.major3,
            Email : req.body.email,
            AppNoticeOn : req.body.appNoticeOn
        },{where:{UserId:req.params.userId}})

        const updatedSubscription = await Subscription.update({
            CategoryCategoryId : req.body.categoryId},
            {where:{UserUserId:req.params.userId}})
        
        res.json({message:"update success!"});
    }
    catch(error){
        console.error(error);
        next(error);
    }
})
module.exports = router;