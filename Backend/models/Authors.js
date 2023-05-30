const mongoose = require("mongoose");

const authorModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    numOfArticle:{
        type:Number,
        required:true,
    }
    
})

const savemodel= mongoose.model("author", authorModel);

module.exports=savemodel;