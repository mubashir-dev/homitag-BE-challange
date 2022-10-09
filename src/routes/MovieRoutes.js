const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const { movieCreate, movieUpdate } = require("../validation/MovieValidation");
const { validate } = require("../middleware/validateRequest");

router.get("/", MovieController.index);
router.get("/:id", MovieController.find);
router.post("/add", validate(movieCreate), MovieController.create);
router.put("/edit/:id", validate(movieUpdate), MovieController.update);
router.delete("/delete/:id", MovieController.delete);

module.exports = router;
