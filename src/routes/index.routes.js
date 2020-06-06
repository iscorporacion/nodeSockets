const { Router } = require("express");
const router = Router();

const {
  indexController,
  allsave
} = require("../controllers/index.controller");

const {
  filesController
} = require("../controllers/files.controller");

// Main Routes
router.get("/", indexController);
router.get("/files", filesController);
// Main Routes
router.post("/all", allsave);

module.exports = router;