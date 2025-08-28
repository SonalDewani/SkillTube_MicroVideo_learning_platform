const dbConnect=require("./config/database");
const dotenv= require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cookie_parser = require("cookie-parser");

dotenv.config();
dbConnect();
const app = express();

app.use(express.json());

app.use(cookie_parser());

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
