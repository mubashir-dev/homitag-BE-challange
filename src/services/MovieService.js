const Movie = require("../models/MovieModel");
const apiResponse = require("../config/Response");
const { errorMessage } = require("../config/ErrorMessage");
const { dataSetMovie } = require("../config/DataSet");
const ObjectId = require("mongoose").Types.ObjectId;

exports.findAll = async (res, sortedBy = null, filter = null) => {
  try {
    const result = Movie.aggregate([
      {
        $match: { ...filter },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "geners",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          ...dataSetMovie,
        },
      },
      {
        $sort: {
          ...sortedBy,
        },
      },
    ]);
    return result;
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

exports.find = async (res, sortedBy = null, filter = null) => {
  try {
    const result = Movie.aggregate([
      {
        $match: { ...filter },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "geners",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$genres",
      },
      {
        $project: {
          ...dataSetMovie,
        },
      },
      {
        $sort: {
          ...sortedBy,
        },
      },
    ]);
    return result;
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//checking for duplication
const check = async (filter) => {
  try {
    const isExists = await Movie.findOne(filter);
    return isExists;
  } catch (error) {
    return error;
  }
};

exports.store = async (req, res, next) => {
  const { title, releaseDate, genres, duration, rating, description } =
    req.body;
  const nameExist = await check({ title: title });
  if (nameExist) {
    return apiResponse.validationError(
      res,
      `This '${req.body.title}' title already exists`
    );
  }
  const _movie = Movie.create({
    title,
    releaseDate,
    genres: genres,
    duration,
    rating,
    description,
  });
  return _movie;
};

exports.edit = async (req, res) => {
  const { title, releaseDate, genres, duration, rating, description } =
    req.body;
  const movieUpdate = await check({ _id: req.params.id });
  const result = movieUpdate.updateOne({ ...req.body });
  return result;
};

exports.remove = async (req, res) => {
  const removeMovie = await check({ _id: req.params.id });
  if (!removeMovie) {
    return apiResponse.notFound(res, "record not found");
  }
  const data = removeMovie.deleteOne();
  return data;
};
