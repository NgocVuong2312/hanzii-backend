const db = require("../configs/db");
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
    try {
      const data = await db.query(
        "INSERT INTO hanzii.user (USERNAME, EMAIL, PASSWORD) VALUES (? , ? , ?)",
        [USERNAME, EMAIL, PASSWORD]
      );
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//get all user
const getAllUser = async (req,res)=>{
    try {
        const data = await db.query(`SELECT * FROM hanzii.user`)
        if(!data){
            return res.status(404).send({
                success:false,
                message:"no data"
            })
        }
        res.status(200).send({
            success:true,
            message: "success get user",
            data
        })
    } catch (error) {
        console.log(error);
    }
}
const getStudentById= async (req,res)=>{
    try {
        const id = req.params.id
        const data = await db.query('SELECT * FROM hanzii.user WHERE  hanzii.user=?',[id])
        if(!data){
            return res.status(404).send({
                success:fail,
                message:"no student f0und"
            })
        }
        res.status(200).send({
            success:true,
            message:"change"
        })
    } catch (error) {
        console.log(error);
        
    }
}
const deleteUser = async(req,res)=>{
    try {
        
        const id = req.params.id
        if(!id){
            return res.status(404).send({
                success:false,
                message:"no data"
            })
        }
        await db.query(`DELETE FROM hanzii.user WHERE id=?`,id);
        
        res.status(200).send({
            success:true,
            message: "success delete user",
        })
    } catch (error) {
        console.log(error);
    }
}
const updateUser=async(req,res)=>{
    const id = req.params.id;
    const {USERNAME, EMAIL,PASSWORD}= req.body;
    try {
        const data = await db.query("UPDATE hanzii.user SET USERNAME=?,EMAIL=?,PASSWORD=? WHERE id=?",[USERNAME,EMAIL,PASSWORD,id])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"user changed",
            data
        })
    } catch (error) {
        console.log(error);
        
    }

}
module.exports = {
  createUser,
  getAllUser,
  deleteUser,
  getStudentById,
  updateUser
};
