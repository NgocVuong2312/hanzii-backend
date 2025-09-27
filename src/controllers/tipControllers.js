const db = require("../configs/db");


const createTip = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ 
            success: false,
            message: "Missing required fields"
        });
    }
    try {
      const data = await db.query(
        "INSERT INTO hanzii.tips (content) VALUES (?)",
        [content]
      );
    } catch (error) {
      console.log(error);
    }
    res.status(201).json({
        success: true,
        message: "Tip created successfully"
    }); 
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    }
};

const getAllTip = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM hanzii.tips`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No tips found"
      });
    }
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
    createTip,
    getAllTip
};