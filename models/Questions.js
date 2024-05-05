const mongoose= require("mongoose");
const QuestionsSchema = new mongoose.Schema({
category:{
    type:String,
},
game: {
    type:String,
},
difficult: {
    type:String,},
appearance: {
    type:Number,
    default:0,
},
successRate:{
type:Number,
default:0,
},
question:{
    type:String,
    require:true,
},
answer:{
    type:String,
    require:true,
},
questionImage:{
    type:Image,
},
})
const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;