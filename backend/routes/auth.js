const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "harryisagoodb$oy";
const jwt = require("jsonwebtoken");
let fetchuser = require("../middleware/fetchuser")
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
        return res.status(400).json({error: "Sorry a user with this email already exist"});
    }
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
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
      res.status(500).send("Internal server error");
    }
    //   .then(user => res.json(user))
    //   .catch(err =>{
    //   res.json({error: "Please enter the unique value of email", msg:err.message})})
})



// Authenticate a user
router.post("/login", [
  body('email', "Enter valid email: ").isEmail(),
  body('password', "Password cannot be blanked: ").exists()
], async (req, res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
      let user = await User.findOne({email});
      console.log(User);
      console.log({email});
      console.log(password);
      console.log(user.password);
      if (!user) {
        return res.json(400).json({error: "Please try to login with correct credentials"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.json(400).json({error: "Please try to login with correct credentials"});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});
    }
    catch(err){
      console.error("Please try to login with correct credentials");
      res.status(500).send("Internal server error");
    }
})



// Route 3: GET loggedin User details using: POST
router.post("/getuser", fetchuser, async (req, res)=>{
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }
  catch(err){
    console.error("Please try to login with correct credentials");
    res.status(500).send("Internal server error");
  }
})
module.exports = router;