const mongoose= require("mongoose");
const GameSizeSchema = new mongoose.Schema({
title:{
    type:String,
    enum:["SHORT","MEDIUM","LONG","UNLIMITED"],
    default:"MEDIUM" ,
},
price:{
    type:Number,
    enum:[60,90,120,200],
    default:60 ,
},
numberofquestion:{
    type:Number,
    enum:[10,15,25,100],
    default:10 ,
},

})
const GameSize = mongoose.model('GameSize', GameSizeSchema);

module.exports = GameSize;