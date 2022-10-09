const Genre = require("../models/GenreModel");
const apiResponse = require("../config/Response");
const { errorMessage } = require("../config/ErrorMessage");
const { dataSetMovieGenre } = require("../config/DataSet");

exports.findAll = async (res, sortedBy = null, filter = null) => {
  try {
    const result = Genre.aggregate([
      {
        $match: { ...filter },
      },
      {
        $project: {
          ...dataSetMovieGenre,
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
    const result = await Genre.aggregate([
      {
        $match: { ...filter },
      },
      {
        $project: {
          ...dataSetMovieGenre,
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
    const isExists = await Genre.findOne(filter);
    return isExists;
  } catch (error) {
    return error;
  }
};

exports.store = async (req, res, next) => {
  const { title, description } = req.body;
  const nameExist = await check({ title: title });
  if (nameExist) {
    return apiResponse.validationError(
      res,
      `This '${req.body.title}' title already exists`
    );
  }
  const genre = Genre.create({ title, description });
  return genre;
};

exports.edit = async (req, res) => {
  const { title, description } = req.body;
  const genreUpdate = await check({ _id: req.params.id });
  const result = genreUpdate.updateOne({ ...req.body });
  return result;
};

exports.remove = async (req, res) => {
  const genreRemove = await check({ _id: req.params.id });
  console.log(`🚀 ~ genreRemove`, genreRemove);
  if (!genreRemove) {
    return apiResponse.notFound(res, "record not found");
  }
  const data = genreRemove.deleteOne();
  return data;
};
