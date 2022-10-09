const apiResponse = require("../config/Response");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (error) {
    return apiResponse.validationErrorWithData(res, error.errors);
  }
};

module.exports = { validate };
