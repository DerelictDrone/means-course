const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const cfg = require("../../connection_config.js");

router.post("/signup", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    })
    user.save()
      .then(result =>{
        res.status(201).json({
          message: 'User Created',
          result: result
        });
     })
     .catch(err => {
       res.status(500).json({
         message: "Invalid Authentication Credentials"
        });
     });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed(Email or password incorrect)"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed(No result from server)"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        cfg.tknscrt,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "Auth failed(Auth scripting error, please report this)"
      });
    });
});

module.exports = router;
