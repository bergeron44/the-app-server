const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/realproject'

module.exports = async function connect() {
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
