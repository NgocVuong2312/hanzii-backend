const express = require("express");
const {
  createUser,
  getAllUser,
  deleteUser,
  getUserById,
  updateUser,
  comparePass,
  updateUserVolcapId
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUser);
router.delete("/delete/:id", deleteUser);
router.get("/get/:id", getUserById);
// router.put("/update/:id", updateUser);
router.post("/compare",comparePass)
router.patch("/updateVolcapId/:id",updateUserVolcapId)
module.exports = router;