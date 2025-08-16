const dbConnect=require("./config/database");
const dotenv= require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();
dbConnect();

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
