const express = require("express");
const {
    createTip,
    getAllTip
} = require("../controllers/tipControllers");
const router = express.Router();

router.post("/create", createTip);
router.get("/get", getAllTip);

module.exports = router;