const express = require("express");
const {
    getVolcap,
    createVolcap,
    getVolcabularyByID,
    updateVolcabularyPopular
} = require("../controllers/volcapControllers");    
const router = express.Router();

router.get("/", getVolcap);
router.post("/create", createVolcap);
router.get("/getbyid/:id",getVolcabularyByID)
router.patch("/update/:id",updateVolcabularyPopular)

module.exports = router;