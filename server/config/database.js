const mongoose = require("mongoose");

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected........");
}

module.exports=dbConnect;