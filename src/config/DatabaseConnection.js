const mongoose = require("mongoose");
require("dotenv").config();

//Connection Options
const mongooseOptions = {
  useUnifiedTopology: true,
};

const InitializeDatabase = () => {
  mongoose.connect(process.env.DB_URL, mongooseOptions, (err) => {
    if (!err) {
      console.log(`MongoDB Connected To:${process.env.DB_NAME}`);
    } else {
      console.error(`MongoDB Connection Failed:${err.stack}`);
    }
  });
};

module.exports = { InitializeDatabase };
