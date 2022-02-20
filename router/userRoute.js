const express= require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const User = require("../models/userModel");
const { append } = require("express/lib/response");
const fs = require("fs");
const auth = require("../auth/auth");
const { route } = require("express/lib/application");
const upload = require("../uploads/profilefile");
const req = require("express/lib/request");


router.post("/user/register",function(req, res){
    const username =req.body.username;
    User.findOne({username:username})
    .then(function(userData){
        if (userData!= null){
            res.json({message:"User already exixts!!"})
            return;
        }
        //now the place for the users which is not available in the db
        const password = req.body.password;
        bcryptjs.hash(password,10, function(e, hashed_value){
            const data = new User({
                username : username,
                password : hashed_value,
                profile_pic : "profilepic.png"
            })
            data.save()
            .then(function(){
                res.json({success:true, message :"Registered Successs"});

            })
            .catch(function(e){
                res.json(e)
            })
        })
    })
})

//login route for user
router.post("/user/login",function(req,res){
    const username = req.body.username;
    User.findOne({username: username})
    .then (function(userData){
       // console.log(userData);
       if(userData === null){
        return res.json({message:"Invalid username!!!"})
       }
      
       //time for comparing password between password provided by clinnet and stored in db
       const password = req.body.password;

       bcryptjs.compare(password,userData.password ,function(e, result){
           //console.log(result);
           if(result===false){
               return res.json({message:"invallidd!!!"})
           }

           const token = jwt.sign({userID:userData._id},"anysecretkey");
           res.json({token: token , message:"successs!!!"})



       })
    })
})

//your profile
router.get("/profile", auth.verifyUser, async(req,res)=>{
    // res.json({msg : req.userInfo.phone_no});
    const user = await User.findOne({_id : req.userInfo._id});
    res.json(user);

})

//other users profile
router.get("/otheruser/profile/:_id", auth.verifyUser, async(req,res)=>{
    const user = await User.findOne({_id: req.params._id});
    res.json(user);
})



//profile  update of users 

router.put("/user/update", auth.verifyUser, function(req,res){
    // console.log(req.userInfo._id);
    const uid = req.userInfo._id;
    const {
        fname,
        lname,
        address,
        email,
        phone_no,
        username
    } = req.body

    // let uimage = ""
    // if(req.file!=undefined){
    //     console.log(req.file)
    //     uimage = req.file.filename;
    //     // uimage = req.file.path;
    // }

    const updateUser = {
        fname,
        lname,
        address,
        email,
        phone_no,
        username,
        // uimage
    }
    User.updateOne({_id : uid},updateUser)
    .then(function(){
        res.json({success:true, msg:"updateed!!!"})
    })
    .catch(function(e){
        res.json({msg:e})

    });
})

//to update profile pic of user
router.put("/profilepic", auth.verifyUser, upload.single("myimage"), function(req,res){
    const uid = req.userInfo._id;
    if(req.file===undefined){
        return res.json({msg:"Invaliddd!!"})
    }
    User.findOne({_id: uid})
    .then(function(userData){
        if(userData.profile_pic!=="profilepic.png"){
            fs.unlinkSync("./image/profile/"+userData.profile_pic)
        }
        User.updateOne({_id: uid},{
            profile_pic : req.file.filename
        })
        .then(function(){
            res.json({msg: "Profile picture added successfully!"})
        })
        .catch(function(e){
            res.json({msg: e})
        })
    })
})

//to delete profile pic of user
router.delete("/delete/profilepic", auth.verifyUser, function(req, res){
    const uid = req.userInfo._id;
    User.findOne({_id: uid})
    .then(function(userData){
        if(userData.profile_pic!=="profilepic.png"){
            fs.unlinkSync("./image/profile/"+userData.profile_pic)
        }
        User.updateOne({_id: uid},{
            profile_pic : "profilepic.png"
        })
        .then(function(){
            res.json({msg: "Profile picture removed successfully!"})
        })
        .catch(function(e){
            res.json({msg: e})
        })
    })
   
})



router.delete("/user/delete", auth.verifyUser, function(req, res){
    const uId = req.userInfo._id;
    User.findByIdAndDelete(uId)
    .then(function(){
        res.json({success: true, msg:"deleted!!"})
    })
    .catch(function(){
        res.json({msg:"someting went wrong.  please try again"})

    }) 
        
    })
    // to delete customer by admin

    // router.delete("/user/admin/delete", auth.verifyAdmin, function(req, rse){
    //     const uId = req.body.id;
    //     User.deleteOne({_id : uId})
    //     .then()
    //     .catch
    // })


router.get ("/profile/view", auth.verifyUser, function(req, res){
    const uId= req.userInfo._id;
    User.find({_id: uId})
    .then(function(data){
        res.json(data)
    })
    .catch(function(){
        res.json({message:"something went wrong "})
    })
})

//to search user by username
router.post("/search/user", auth.verifyUser, async(req, res)=>{
    const keyUsername = req.body.username
    ? {username: { $regex: req.body.username, $options: "i" }}
    :{};
    const users = await User.find(keyUsername)
    res.send(users);
})



module.exports= router;
