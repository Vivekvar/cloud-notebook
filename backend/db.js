const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/cloud-notebook';
const connectToMongo = () => {
    mongoose.connect(dbUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!");
        console.log(err);
    })
}

module.exports = connectToMongo;