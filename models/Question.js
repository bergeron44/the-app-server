const mongoose= require("mongoose");
const QuestionSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
answer1:{
    type:String,
    required:true,
},
answer2:{
    type:String,
    required:true,
},
answer3:{
    type:String,
    required:true,
},
answer4:{
    type:String,
    required:true,
},
trueAnswer:{
    type:String,
    required:true,
},
difficulty:{
    type:String,
    enum:["EASY","MEDIUM","HARD"],
    default:"MEDIUM" ,
},
img:{
    type:String,
    default:"https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
},
})
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
