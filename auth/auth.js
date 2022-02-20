const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

//gaurd for user 

module.exports.verifyUser = function(req , res, next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    const udata = jwt.verify(token, "anysecretkey");
    //select * from customer where _id = udata.userID
    User.findOne({_id : udata.userID}).then(function(userData){
        //console.log(userData)
        req.userInfo = userData;
        next();
    })
    .catch(function(e){
        res.json({error: e})
    })
}
catch(e){
    res.json({error:e})
}
}


//gaurd for admin

module.exports.verifyAdmin = function(req , res, next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    const udata = jwt.verify(token, "anysecretkey");
    Admin.findOne({_id : udata.userID}).then(function(userData){
        //console.log(userData)
        req.userInfo = userData;
        next();
    })
    .catch(function(e){
        res.json({error: e})
    })
}
catch(e){
    res.json({error:e})
}
}