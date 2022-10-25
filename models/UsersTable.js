const mongoose= require("mongoose");
const User = require("./User");
const UsersTableSchema = new mongoose.Schema({
tableName:{
        type:String,
        default:"no name "+Math.floor(Math.random() * 100000 ),
},
code:{
    type:Number,
    default:Math.floor(Math.random() * 1000000000),
},
allUsers:[{
    type:mongoose.Types.ObjectId,
    ref: 'User',
}],
creator:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required: true,
},

})
const UsersTable = mongoose.model('UsersTable', UsersTableSchema);

module.exports = UsersTable;