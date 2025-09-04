const express = require("express");
const { createUser, getAllUser,deleteUser,getStudentById,updateUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUser);
router.delete("/delete/:id",deleteUser);
router.get('/get/:id',getStudentById);
router.get('/update/:id',updateUser)
module.exports = router;
