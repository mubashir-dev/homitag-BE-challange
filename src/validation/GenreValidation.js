const yup = require("yup");

//validation for updating and creating genre
exports.genreSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

exports.genreSchemaUpdate = yup.object({
  title: yup.string().required(),
  description: yup.string(),
});
