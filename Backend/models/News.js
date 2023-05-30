const mongoose = require("mongoose");

const newsModel = new mongoose.Schema({
    headline:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    }
})

const savemodel = mongoose.model("news",newsModel);

module.exports=savemodel;