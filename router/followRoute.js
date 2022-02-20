const express = require("express");
const router = new express.Router();
const auth = require("../auth/auth");
const Follow = require("../models/followModel");
const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");

router.post("/follow/user", auth.verifyUser, function(req,res){

    const data = new Follow({
        follower : req.userInfo._id,
        following : req.body.user_id
    })
    data.save()
    .then(function(){
        res.json({msg: "Followed"});
    })
    .catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})

router.delete("/unfollow/user/:fid", auth.verifyUser, function(req,res){
    const follower = req.userInfo._id;
    const following = req.params.fid;
    Follow.deleteOne({follower:follower,following: following})
    .then(function(){
        res.json({msg: "Unfollowed"})
    })
    .catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})
router.post("/follow/check", auth.verifyUser, (req,res)=>{
    Follow.findOne({
        following: req.body.user_id,
        follower: req.userInfo._id
    })
    .then((followData)=>{
        if(followData!=null){
            res.json({"msg":true})
        }
        else{
            res.json({"msg":false})
        }
    })
})

router.get("/followfollower/num",auth.verifyUser, async(req, res)=>{
    const follower = await Follow.countDocuments({
        following:req.userInfo._id
    })
    const following = await Follow.countDocuments({
        follower: req.userInfo._id
    })
    res.json({follower:follower, following:following})
})

router.post("/followfollower/num/other", auth.verifyUser, async(req, res)=>{
    const follower = await Follow.countDocuments({
        following:req.body.user_id
    })
    const following = await Follow.countDocuments({
        follower: req.body.user_id
    })
    res.json({follower:follower, following:following})

})

router.get("/followeduser/get/post", auth.verifyUser, async(req,res)=>{
    const users=[];
    const postData =[];
    const following = await Follow.find({
        follower: req.userInfo._id
    });

    for(i=0; i<following.length; i++){
        users.push(following[i].following);
    }

    const posts = await Post.find({user_id:users})
    .populate("user_id", "username profile_pic")
    .sort({createdAt: -1});
    for(i=0; i<posts.length; i++) {

        var singlePost = {

            post: null,

            liked: {check:false, likenum:"0"},

            commented: {check:false, data:null, commentnum:"0"}

        }

        singlePost["post"] = posts[i];

        await Like.findOne({post_id: posts[i]._id, user_id:req.userInfo._id})

        .then((likeData)=>{

            if(likeData!=null){

                singlePost["liked"]["check"] = true;

            }

        })
        singlePost["liked"]["likenum"] = (await Like.countDocuments({post_id: posts[i]._id})).toString()



        await Comment.findOne({post_id: posts[i]._id, user_id: req.userInfo._id})

        .then((commentData)=>{

            if(commentData!=null){

                console.log(commentData)

                singlePost["commented"]["check"] = true;

                singlePost["commented"]["data"] = commentData.comment;

            }

        })

        singlePost["commented"]["commentnum"]= (await Comment.countDocuments({post_id: posts[i]._id})).toString()



        postData.push(singlePost);

    }



    res.send(postData);
});

module.exports = router;