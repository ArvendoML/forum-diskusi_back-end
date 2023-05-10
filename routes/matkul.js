var express = require("express");
const {
  getAllMatkul,
  addNewMatkul,
  updateMatkul,
  deleteMatkul,
  getOneMatkul,
} = require("../controllers/matkul/matkul");
const { roleAuth } = require("../middlewares/users.middleware");
var router = express.Router();

// GET
router.get("/", getAllMatkul);
router.get("/:id", getOneMatkul);

// POST
router.post("/add", roleAuth, addNewMatkul);

// PUT
router.put("/update/:id", roleAuth, updateMatkul);

// DELETE
router.delete("/delete/:id", roleAuth, deleteMatkul);

module.exports = router;
