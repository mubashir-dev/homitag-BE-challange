const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Genre = require("./GenreModel");

//Movie Schema
const MovieSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    releaseDate: { type: Date, require: true },
    genres: [{ type: Schema.Types.ObjectId, require: true, ref: Genre }],
    duration: { type: Number, require: true },
    rating: { type: Number, require: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
