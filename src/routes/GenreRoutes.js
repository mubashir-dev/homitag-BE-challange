const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/GenreController");
const {
  genreSchema,
  genreSchemaUpdate,
} = require("../validation/GenreValidation");
const { validate } = require("../middleware/validateRequest");

router.get("/", GenreController.index);
router.get("/:id", GenreController.find);
router.post("/add", validate(genreSchema), GenreController.create);
router.put("/edit/:id", validate(genreSchemaUpdate), GenreController.update);
router.delete("/delete/:id", GenreController.delete);

module.exports = router;
