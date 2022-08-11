const mongoose= require("mongoose");
const User = require("./User");
const UsersTableSchema = new mongoose.Schema({
tableName:{
        type:String,
        default:Math.floor(Math.random() * 1000000000),
},
code:{
    type:String,
    default:Math.floor(Math.random() * 1000000000),
},
allUsers:[{
    type:mongoose.Types.ObjectId,
    ref: 'User',
}],


})
const UsersTable = mongoose.model('UsersTable', UsersTableSchema);

module.exports = UsersTable;