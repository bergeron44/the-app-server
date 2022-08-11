const mongoose= require("mongoose");
const SuggestionSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
type:{
    type:String,
    enum:["CATEGORY","QUESTION"],
    default:"CATEGORY" ,
},
img:{
    type:String,
    default:"https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
},
})
const Suggestion = mongoose.model('Suggestion', SuggestionSchema);

module.exports = Suggestion;