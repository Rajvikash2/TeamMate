const { application } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    roleReq:{
        type:[String],
        required:true
    },
    desc:{
        type:String,
        maxlength:500
    },
    jobType:{
        type:String,
        enum:["Paid","Unpaid"],
        required:true
    },
    image:{
        type:String
    },
    applications:[
        {
            googleId:{
                type:String,
                ref:"Profile",
                required:true
            },
            appliedAt:{
                type:Date,
                default:Date.now
            },
        },
    ],
    cretaedAt:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("Post",postSchema);
