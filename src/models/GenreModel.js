const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Genre Schema
const GenreSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Genre", GenreSchema);
