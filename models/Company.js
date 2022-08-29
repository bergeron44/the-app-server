const mongoose= require("mongoose");
const CompanySchema = new mongoose.Schema({
companyName:{
    type:String,
    required:true,
},
numberOfPlayers:{
    type:Number,
    default:0
},
location:{
    type:String,
    required:true
},
numberOfGamePerMonth:{
    type:Number,
    default:0
},
numberOfGameOverAll:{
    type:Number,
    default:0
},
qrAdvertisement:{
    type:Number,
    default:0
},
prizes: [{
        type: String,
        default:0
    }]
    
})
const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;