const mongoose= require("mongoose");
const CompanySchema = new mongoose.Schema({
companyname:{
    type:String,
    required:true,
},
numberofplayers:{
    type:Number,
},
location:{
    type:String,
},
numberofgamemonth:{
    type:Number,
},
numberofgameoverall:{
    type:Number,
},
qradvertisement:{
    type:Number,
},
prizes: [{
        type: String
    }]
})
const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;