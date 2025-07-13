const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected to db"); 
    })
}

module.exports = connectToDB;