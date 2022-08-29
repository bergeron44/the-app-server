const mongoose= require("mongoose");

const UserSchema = new mongoose.Schema({
userName:{
    type:String,
    required:true,
},
numberOfGames:{
    type:Number,
    default:0,
},
pointForGame:{
    type:Number,
    default:0,
},
pointAllGames:{
    type:Number,
    default:0,
},
code:{
    type:Number,
    default:0,
},
joinGame:{
    type:Boolean,
    default:false,
},

})
const User = mongoose.model('User', UserSchema);

module.exports = User;