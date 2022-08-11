const mongoose= require("mongoose");
const UserSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
},
numberofgame:{
    type:Number,
},
pointforgame:{
    type:Number,
},
pointallgames:{
    type:Number,
},
currentgamecode:{
type:String,
},

})
const User = mongoose.model('User', UserSchema);

module.exports = User;