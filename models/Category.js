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
img:{
    type:String,
    default:"https://th.bing.com/th/id/R.35a16aa6743a594d9a13883d71ad32cd?rik=r65LNwx8FIpelw&riu=http%3a%2f%2fwww.sagaflor.de%2ffileadmin%2f_processed_%2fcsm_final_Category_Management_Website_shutterstock_290636426_86304a41f0.jpg&ehk=OM3ysZk1v0t%2bSp8H8tCyKRa2V%2fxuu3iixtWMXPZFHds%3d&risl=&pid=ImgRaw&r=0"
},

})
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;