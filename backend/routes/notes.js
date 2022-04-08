const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    a = {
        obj:"Hi"
    }
    res.json(a)
})
module.exports = router;