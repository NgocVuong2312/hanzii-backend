const db = require("../configs/db");

const getVolcap = async (req, res) => {
  try {
    const [rows] = await db.query(
      "select  * from volcap inner join categories on volcap.id = categories.volcabulary_id "
    );

    for (const element of rows) {
      const [rows] = await db.query(
        `SELECT * FROM hanzii.word_data where category_id=${element.id}`
      );
      element.children = rows;
    }
    if (!rows) {
      return res.status(404).send({
        success: false,
        message: "no data",
      });
    }
    res.status(200).send({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};
const createVolcap = async (req, res) => {
  const { content, type } = req.body;
  try {
    const data = await db.query(
      "INSERT INTO hanzii.volcap (content, type) VALUES (?, ?)",
      [content, type]
    );
    res.status(201).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const getVolcabularyByID = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query(
      `select * from volcap inner join categories on volcap.id = categories.volcabulary_id inner join word_data on categories.id = word_data.category_id inner join vocab_relations on volcap.id = vocab_relations.vocab_id_1 where volcap.id=${id}`
    );
    if (!rows) {
      return res.status(404).send({
        success: false,
        message: "no data",
      });
    }
    res.status(200).send({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateVolcabularyPopular = async (req, res) => {
  const id = req.params.id;
  const { popular, category_name } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE categories SET popular=? WHERE volcabulary_id = ? and category_name=?`,
      [popular, id, category_name]
    );
    console.log(result);

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
  getVolcap,
  createVolcap,
  getVolcabularyByID,
  updateVolcabularyPopular,
};
