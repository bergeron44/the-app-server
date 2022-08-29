const mongoose= require("mongoose");
const Company = require("./Company");
const Question= require("./Question");
const UsersTable= require("./UsersTable");
const TheGameSchema = new mongoose.Schema({
location:{
        type:mongoose.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
table:{
        type:mongoose.Types.ObjectId,
        ref: 'UsersTable',
},
    //מערך של יוזרים עם קוד זהה
theGameQuestions:[{
        type:mongoose.Types.ObjectId,
        ref: 'Question',
    }],
    //מערך מקאטגורי של שאלות ליבא לפה
gameSize:{
    size:{
        type:String,
        enum:["SHORT","MEDIUM","LONG","UNLIMITED"],
        default:"MEDIUM" ,
    },
    price:{
        type:Number,
        enum:[60,90,120,200],
        default:60 ,
    },
    numberOfQuestion:{
        type:Number,
        enum:[10,15,25,100],
        default:10 ,
    }
},
winnersTable:[{
    type:mongoose.Types.ObjectId,
    ref: 'User',
}],
gameStart:{
    type:Boolean,
    default:false,
}

})
const TheGame = mongoose.model('TheGame', TheGameSchema);

module.exports = TheGame;