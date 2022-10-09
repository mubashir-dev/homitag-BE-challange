const yup = require("yup");

//Movie Scheam validation
exports.movieCreate = yup.object({
  title: yup.string().required(),
  releaseDate: yup.date().required(),
  geners: yup.array().required(),
  duration: yup.number().required(),
  rating: yup.number().required(),
  description: yup.string(),
});

exports.movieUpdate = yup.object({
  title: yup.string(),
  releaseDate: yup.date(),
  geners: yup.array(),
  duration: yup.number(),
  rating: yup.number(),
  description: yup.string(),
});
