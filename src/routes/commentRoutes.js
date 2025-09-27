const express = require("express");
const {
  createComment,
  getAllComment,
  getCommentById,
  deleteComment,
  updateComment
} = require("../controllers/commentControllers");
const router = express.Router();

router.post("/create", createComment);
router.get("/", getAllComment);
router.delete("/delete/:id", deleteComment);
router.get("/get/:id", getCommentById);
router.patch("/update/:id", updateComment);

module.exports = router;
