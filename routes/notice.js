const express = require('express');
const router = express.Router();
const { Category, Notice, Subscription } = require('../models')

router.get('',async(req, res, next)=>{
    try{
        if(req.query.major){

            const CategoryID = await Category.findAll({
                where : {Major:req.query.major},
                attributes: ['CategoryId']
            })
            var notices = [];
            for (var element of CategoryID) {
                const notice = await Notice.findAll({
                    where:{CategoryCategoryId:element.dataValues.CategoryId},
                    attributes:['NoticeId','NoticeTitle','NoticeBody',
                    'NoticeUrl','NoticeDate','CategoryCategoryId']
                })
                if(notice.length != 0){
                    notices.push(notice);
                } 
            }
            res.json({notices:notices});
        }
    } catch(error){
        console.error(error);
        next(error);
    }
})

router.get('/:userId',async(req,res,next)=>{
    try{
        const CategoryId = await Subscription.findAll({
            where: {UserUserId:req.params.userId},
            attributes:['CategoryCategoryId']
        })
        var notices = [];
        for (var element of CategoryId) {
            const notice = await Notice.findAll({
                where:{CategoryCategoryId:element.dataValues.CategoryCategoryId},
                attributes:['NoticeId','NoticeTitle','NoticeBody',
                'NoticeUrl','NoticeDate','CategoryCategoryId'],
                order:[['NoticeDate','DESC']]
            })
            if(notice.length != 0){
                notices.push(notice);
            } 
        }
        res.json({notices:notices});
    }
    catch(error){
        console.error(error);
        next(error);
    }
})

router.post('', async(req, res, next)=>{
    try{
        const notice = await Notice.create({
            // NoticeId:req.body.noticeId,
            NoticeTitle:req.body.title,
            NoticeBody:req.body.body,
            NoticeUrl:req.body.url,
            NoticeDate:req.body.date,
            CategoryCategoryId:req.body.categoryId
        })
        res.json({notice:notice});
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;