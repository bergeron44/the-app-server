const mongoose= require("mongoose");

const CategorySchema = new mongoose.Schema({
categoryName:{
    type:String,
    required:true,
},
categoryNumOfQuestion:{
    type:Number,
    default:0,
},


})
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;