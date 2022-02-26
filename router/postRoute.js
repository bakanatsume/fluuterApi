const express = require("express");
const router = new express.Router();
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../uploads/postfile");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");

//to insert
router.post("/post/insert", auth.verifyUser, upload.single('postimage'), function(req,res){
    console.log(req.body);
    if(req.file==undefined){
        return res.json({msg : "invaliddddddd!!"})
    }

    const caption = req.body.caption;
    const image = req.file.filename;
    const data = new Post({
        image: image,
        caption: caption,
        user_id : req.userInfo._id
    })
    data.save()
    .then(function(){
        res.json({success:true, msg: "New post added successfully"});
    }).catch(function(e){
        res.json({msg: "Something went wrong"});
    })
})


//to update

router.put("/post/update/:pid",auth.verifyUser, function(req,res){
    const pid = req.params.pid;
    const caption = req.body.caption;
    
    Post.updateOne({_id:pid}, {
        caption : caption,
    })
    
    .then(function(){
        res.json({success:true, message:"Post Updated"})
    })
    .catch(function(){
        res.json({message: "Something went wrong"})
    })
})
    //to delete post 
    router.delete('/post/delete/:_id', auth.verifyUser, function(req, res){
        const pid = req.params._id;
        Post.findByIdAndDelete(pid)
    .then(function(){
            res.json({success: true, message:"deleted"})

        })
        .catch(function(){
            res.json({message:"something went wrong "})
        })
    
    })
   // to view post of logged in user 
   router.get("/post/get/:pid", auth.verifyUser, async(req,res)=>{
       console.log("User::", req.userinfo)
    const posts = await Post.findOne({_id : req.params.pid})
    .sort({createdAt : -1});
    const comments = await Comment.find({
        post_id:posts._id
    })
    let result = JSON.parse(JSON.stringify(posts))
    result.comments = comments
    result.commentsNum = comments.length
    
    const likes = await Like.find({
        post_id: posts._id
    })
    result.likes = likes
    result.likesnum =likes.length

    res.json(result);
})

router.get("/getall/post", auth.verifyUser, async(req,res)=>{
    const posts = await Post.find({user_id : req.userInfo._id})
    .populate("user_id", "username profile_pic")
    .sort({createdAt :-1});
    res.json(posts);
})

router.get("/otheruser/post/:_id", auth.verifyUser, async(req,res)=>{
    const posts = await Post.find({user_id: req.params._id})
    .populate("user_id", "username profile_pic")
    .sort({created: -1});
    res.json(posts);
})
module.exports = router;
