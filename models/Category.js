const mongoose= require("mongoose");
const Question= require("./Question")

const CategorySchema = new mongoose.Schema({
CategoryName:{
    type:String,
    required:true,
},
CategoryNumOfQuestion:{
    type:Number,
},
CategoryAllQuestion: [{
        type:mongoose.Types.ObjectId,
        ref: 'Question',
    }]
,

})
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;