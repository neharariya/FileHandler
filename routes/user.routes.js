 const express = require('express');
 const router = express.Router();
 const {body, validationResult} = require('express-validator');
 const userModel = require('../models/user.model');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const dotenv = require('dotenv');
const app = express();
 dotenv.config();
 
//  router.get('/test',(req,res)=>{
//     res.send("user  test route");
//  })

 router.get('/register',(req,res)=>{
   res.render('register');
 })

 router.post('/register',
  body('emailID').trim().isEmail(),
  body('password').trim().isLength({min:3}),
  body('name').trim().isLength({min:5}),
  
  async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors:errors.array(),
        message:'invalid data'
      })
    }

    const {name,emailID,password} = req.body;

    const hashPassword = await bcrypt.hash(password,10);

     const newUser = await userModel.create({
      name,
      emailID,
      password: hashPassword
    })

    res.json(newUser);
    res.send("user registered");
   console.log(req.body);
 })

 router.get('/login',(req,res)=>{
  res.render('login');
})

router.post('/login',

  body('password').trim().isLength({min:3}),
  body('name').trim().isLength({min:5}),
 
  async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors:errors.array(),
        message:'invalid data'
      })}

      const {name,password} = req.body;

      const user = await userModel.findOne({
        name:name
      })

      if(!user){
        return res.status(400).json({
          message:"invalid username or password"
        })
      }

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
        return res.status(400).json({
          message:"invalid username or password"
        })
      }

      //need jwt

      const token =  jwt.sign({
        userID:user._id,
        email: user.emailID,
        name:user.name
      }, process.env.JWT_SECRET)

      res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax", // or "none" with secure if using cross-site
    secure: false,   // ❗ true if you're using HTTPS (on production)
});
      res.json('logged in');
})

 module.exports = router;