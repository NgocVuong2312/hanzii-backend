const db = require("../configs/db");
//create comment 
const createComment = async (req, res) => {
  try {
    const { CONTENT, UID, categoryId } = req.body;

    if (!CONTENT || !UID || !categoryId) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    try {
      // Thêm comment
      const [commentResult] = await db.query(
        "INSERT INTO hanzii.comments (CONTENT, UID) VALUES (?, ?)",
        [CONTENT, UID]
      );

      const commentId = commentResult.insertId; // Lấy ID của comment vừa thêm

      // Gán comment vào category
      await db.query(
        "INSERT INTO hanzii.comment_category (comment_id, category_id) VALUES (?, ?)",
        [commentId, categoryId]
      );

      return res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: { id: commentId, CONTENT, UID, categoryId },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "DB error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all cmt
const getAllComment = async (req, res) => {
  try {
    const data = await db.query(`select * from comments inner join comment_category on comments.ID = comment_category.comment_id inner join categories on comment_category.category_id = categories.id`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no data",
      });
    }
    res.status(200).send({
      success: true,
      message: "success get comment",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
//get cmt by id
const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.query(
      "SELECT * FROM hanzii.comments WHERE ID=?",
      [id]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no cmt found",
      });
    }
    res.status(200).send({
      success: true,
      message: "change",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "no data",
      });
    }
    await db.query(`DELETE FROM hanzii.user WHERE id=?`, id);

    res.status(200).send({
      success: true,
      message: "success delete user",
    });
  } catch (error) {
    console.log(error);
  } 
};
const updateComment = async (req, res) => {
  const id = req.params.id;
  const fields = req.body;
  if (Object.keys(fields).length === 0) {
    return res.status(400).send({
      success: false,
      message: "No fields provided to update",
    });
  }

  const setClauses = Object.keys(fields).map((key) => `${key} = ?`);
  const values = Object.values(fields);

  try {
    const [result] = await db.query(
      `UPDATE hanzii.comments SET ${setClauses.join(", ")} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "user updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = {
  createComment,
  getAllComment,
  deleteComment,
  getCommentById,
  updateComment
};
