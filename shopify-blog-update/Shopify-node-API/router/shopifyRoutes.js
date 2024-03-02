const express = require('express');
const router = express.Router();
const axios = require('axios');




router.post("/getArticleDetailsByHandel", async (req,res)=>{
    // const store= 'fashion-mouss';
    // const apiVersion = '2023-10';
    // const currentBlogId = '89307021566';
    // const handel = 'i-love-my-india';


    const store= req.body.store;
    const apiVersion = req.body.apiVersion;
    const currentBlogId = req.body.currentBlogId;
    const handel = req.body.handel;

    const options = {
        'method': 'GET',
        'url': `https://${store}.myshopify.com/admin/api/${apiVersion}/blogs/${currentBlogId}/articles.json?handle=${handel}`,
        'headers': {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": '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',
        }
        };
        try {
            const result = await axios(options);
            res.status(200).json({
                success:true,
                articles:result.data.articles
           
            })
        } catch (e) {
            console.log(e);
        }    
})

router.post("/updateBlogUrl", async (req,res)=>{
    // const store= 'fashion-mouss';
    // const apiVersion = '2023-10';
    // const currentBlogId = '89307021566';
    // const handel = 'i-love-my-india';
    //const articleId ='588694028542';
    //const updatedBlogId ='88914591998';

    console.log(req.body);
    const store= req.body.store;
    const apiVersion = req.body.apiVersion;
    const currentBlogId = req.body.currentBlogId;
    const articleId = req.body.articleId;
    const updatedBlogId = req.body.updatedBlogId;

    const options = {
        'method': 'PUT',
        'url': `https://${store}.myshopify.com/admin/api/${apiVersion}/blogs/${currentBlogId}/articles/${articleId}.json`,
        'headers': {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": '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',
        },
        'data':{
            'article':{
                'id':articleId,
                'blog_id':updatedBlogId
            }
        }
        };
        try {
            const result = await axios(options);
            res.status(200).json({
                success:true,
                articles:result.data
           
            })
        } catch (e) {
            console.log(e);
        }    
})



module.exports = router