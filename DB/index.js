const mongoose = require('mongoose');
const express = require('express');
//הוספתי
const app= express()

app.use(express.json);
app.use(express());

//const mongoUri="mongodb+srv://"+userName+":"+password+"@"+cluster+".xfxcrfk.mongodb.net/?retryWrites=true&w=majority"
// const mongoUri="mongodb+srv://ronberger:8263867rui@clusterforgame.xfxcrfk.mongodb.net/?retryWrites=true&w=majority"
const mongoUri = process.env.MONGO_URI;

module.exports = async function connect() {
  require('../models/UsersTable');
  require('../models/User');
  require('../models/TheGame');
  require('../models/Suggestion');
  require('../models/Question');
  require('../models/Company');
  require('../models/Category');
//כל מודל שאני מכין צריך להיות מיובא לפה
  try {
    return mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('could not connect to mongo');
    process.exit(1);
  }
};
/*
//הוספתי
const db=mongoose.connection;
db.on("err",function(){
  console.log("conction faild")
})
db.once("open",function(){
  console.log("conction succeded!!!")
})


app.listen(3000,() =>{
console.log("server running at 3000")
})

//סוף ההוספה
*/