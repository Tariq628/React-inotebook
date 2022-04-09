const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "harryisagoodb$oy";
const jwt = require("jsonwebtoken");
const router = express.Router();
const {body, validationResult} = require("express-validator");
router.post("/createuser", [
    body('name', "Enter valid name: ").isLength({ min:5}),
    body('email', "Enter valid email: ").isEmail(),
    body('password', "Password must be atleast 5 chars").isLength({ min: 5}),
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email: req.body.email});
    try{
      if (user) {
        return res.status(400).json({error: "Sorry a user with this email already exist"})
    }
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});
    }
    catch(error){
      console.error(error);
      res.status(500).send("Some error occured");
    }
    //   .then(user => res.json(user))
    //   .catch(err =>{
    //   res.json({error: "Please enter the unique value of email", msg:err.message})})
})
module.exports = router;