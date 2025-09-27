const db = require("../configs/db");
const { hashPassword, comparePassword } = require("../utils/dbhelper");
//create user
const createUser = async (req, res) => {
  try {
    const { USERNAME, EMAIL, PASSWORD } = req.body;
    if (!USERNAME || !EMAIL || !PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const hashPass = await hashPassword(PASSWORD);

    const data = await db.query(
      "SELECT ID,USERNAME,EMAIL FROM hanzii.user WHERE EMAIL=? or USERNAME=?",
      [EMAIL, USERNAME]
    );
    if (data) {
      return res.status(400).json({
        success: false,
        message: "existed user",
      });
    }
    try {
      const data = await db.query(
        "INSERT INTO hanzii.user (USERNAME, EMAIL, PASSWORD) VALUES (? , ? , ?)",
        [USERNAME, EMAIL, hashPass]
      );
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//get all user
const getAllUser = async (req, res) => {
  try {
    const data = await db.query(`SELECT ID,USERNAME,EMAIL,ROLE FROM hanzii.user;`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no data",
      });
    }
    res.status(200).send({
      success: true,
      message: "success get user",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.query(
      "SELECT ID,USERNAME,EMAIL,ROLE,VHID FROM hanzii.user WHERE ID=?",
      [id]
    );
    if (!data) {
      return res.status(404).send({
        success: fail,
        message: "no student found",
      });
    }
    res.status(200).send({
      success: true,
      message: "found user",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
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
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { USERNAME, EMAIL, PASSWORD } = req.body;
  try {
    const data = await db.query(
      "UPDATE hanzii.user SET USERNAME=?,EMAIL=?,PASSWORD=? WHERE id=?",
      [USERNAME, EMAIL, PASSWORD, id]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "user changed",
    });
  } catch (error) {
    console.log(error);
  }
};
const comparePass = async (req, res) => {
  const { PASSWORD, EMAIL } = req.body;
  
  try {
    const data = await db.query("SELECT * FROM hanzii.user WHERE EMAIL=?", [
      EMAIL
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,

        message: "user not found ",
      });
    }
    const getdata = data[0];
    const verified = await comparePassword(PASSWORD, getdata[0].PASSWORD);
    if (!verified) {
      
      return res.send({
        success: false,
        
        message: "WRONG PASS",
      });
    }
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUserVolcapId = async (req, res) => {
  const id = req.params.id;
  const fields = req.body;

  if (Object.keys(fields).length === 0) {
    return res.status(400).send({
      success: false,
      message: "No fields provided to update",
    });
  }

  try {
    if (Array.isArray(fields.VHID)) {
      fields.VHID = JSON.stringify(fields.VHID);
    }

    const setClauses = Object.keys(fields).map((key) => `${key} = ?`);
    const values = Object.values(fields);

    const [result] = await db.query(
      `UPDATE hanzii.user SET ${setClauses.join(", ")} WHERE id = ?`,
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
  createUser,
  getAllUser,
  deleteUser,
  updateUserVolcapId,
  getUserById,
  updateUser,
  comparePass,
};
