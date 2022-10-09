const ObjectId = require("mongoose").Types.ObjectId;
const apiResponse = require("../config/Response");
const { errorMessage } = require("../config/ErrorMessage");
const MovieService = require("../services/MovieService");

// index;
exports.index = async (req, res, next) => {
  try {
    //Sorting
    const sorting = {
      _id: -1,
    };
    //filter
    const filter = {};

    const data = await MovieService.findAll(res, sorting, filter);
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//show
exports.find = async (req, res, next) => {
  try {
    //Sorting
    const sorting = {
      _id: -1,
    };
    //filter
    const filter = {
      _id: ObjectId(req.params.id),
    };
    const data = await MovieService.findAll(res, sorting, filter);
    if (!data[0]) {
      return res.status(404).send({
        success: false,
        message: "No Record Found",
      });
    }
    return apiResponse.successData(
      res,
      "request processed successfully",
      data[0]
    );
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//create
exports.create = async (req, res, next) => {
  try {
    const data = await MovieService.store(req, res, next);
    return apiResponse.recordCreated(res, "record has been created", data);
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//update
exports.update = async (req, res, next) => {
  try {
    const isUpdated = await MovieService.edit(req, res, next);
    return apiResponse.success(res, "record has been updated");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const isDeleted = await MovieService.remove(req, res);
    if (isDeleted) {
      return apiResponse.success(res, "record has been deleted");
    }
    return apiResponse.Error(res, "record has not been deleted");
  } catch (error) {
    let message = errorMessage(error);
    return apiResponse.Error(res, message);
  }
};
