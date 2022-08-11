const mongoose= require("mongoose");
const Company = require("./Company");
const GameSize = require("./GameSize");
const Category= require("./Category")
const UsersTable= require("./UsersTable")
const TheGameSchema = new mongoose.Schema({
 location:{
        type:mongoose.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
allUsersInTheTable:[{
        type:mongoose.Types.ObjectId,
        ref: 'UsersTable',
}],
    //מערך של יוזרים עם קוד זהה
theGameQuestion:[{
        type:mongoose.Types.ObjectId,
        ref: '\Question',
    }],
    //מערך מקאטגורי של שאלות ליבא לפה
gameDefintin:{
    
    type:mongoose.Types.ObjectId,
    ref: 'GameSize',
    required: true

},
winnersTable:[{
    type:mongoose.Types.ObjectId,
    ref: 'User',
}],
gamePrizes:[{
    type:String,
}],
})
const TheGame = mongoose.model('TheGame', TheGameSchema);

module.exports = TheGame;