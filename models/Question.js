const mongoose= require("mongoose");
const QuestionSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
answer1:{
    answer:{
               type:String,
               required:true,
           },
    rightAnswer:{
        type:Boolean,
        default:false,
    }
},
answer2:{
    answer:{
        type:String,
        required:true,
    },
rightAnswer:{
        type:Boolean,
        default:false,
}
},
answer3:{
    answer:{
        type:String,
        required:true,
    },
rightAnswer:{
        type:Boolean,
        default:false,
}
},
answer4:{
    answer:{
        type:String,
        required:true,
    },
     rightAnswer:{
        type:Boolean,
        default:false,
}
},
difficulty:{
    type:String,
    enum:["EASY","MEDIUM","HARD"],
    default:"MEDIUM" ,
},
category:{
    type:String,
    default:"have no category",
},

})
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
