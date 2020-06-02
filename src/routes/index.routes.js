const { Router } = require("express");
const router = Router();

const {
  indexController,
  allsave
} = require("../controllers/index.controller");

// Main Routes
router.get("/", indexController);
// Main Routes
router.post("/all", allsave);

module.exports = router;