const mongoose = require("mongoose");

const User = mongoose.model("User",{
    username:{
        type:String
    },
    password:{
        type:String
    },
    fname:{
        type : String,
        default:''
    },
    lname:{
        type : String,
        default : ''
    },
    address:{
        type:String,
        default:''
    },
    email:{
      type:String,
      default:""  
    },
    phone_no:{
        type:String,
        default: ""
    },
    profile_pic : {
        type : String,
        default:""
    }
})
module.exports = User;