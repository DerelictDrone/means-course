const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const cfg = require("../connection_config.js");

  /**
 * @api {post} /api/users/signup
 * @apiName Signup
 * @apiGroup Users
 *
 * @apiParam {array} an array consisting of [email: string, password: string]
 *
 * @apiDescription Registers a new user with a JS object containing an email, and a password. The password is encrypted with bcrypt, then saved to our Mongo Database
 *
 * @apiSuccess {string} Message: User Created
 *
 * @apiSuccessExample Success-Response:
 * HTTP status 200
 * {
 * "message": "User Created"
 * }
 *
 * @apiError InvalidCredentials
 *
 * @apiErrorExample Error-Response:
 * HTTP status 500
 * {
 * "message": "Invalid Authentication Credentials"
 * }
 */

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

/**
 * @api {post} /api/users/login
 * @apiName Login
 * @apiGroup Users
 *
 * @apiParam id(number) The ID number of the post we're going to be deleting
 *
 * @apiDescription Log a user in with a javascript object containing an email, and a password. Password is hashed, and the backend gives the user a token lasting 1 hour (3600).
 *
 * @apiSuccess {string} Deletion Successful
 *
 * @apiSuccessExample Success-Response:
 * HTTP status 200
 * {
 * "message": "Deletion Successful"
 * }
 *
 * @apiError AuthFailWrongCredentials
 *
 * @apiErrorExample Error-Response:
 * HTTP status 401
 * {
 * "message": "Auth failed(Email or password incorrect)"
 * }
 *
 * @apiError AuthFailedNoResult
 *
 * @apiErrorExample Error-Response:
 * HTTP status 401
 * {
 * "message": "Auth failed(No result from server)"
 *
 * @apiError AuthFailedScriptError
 *
 * @apiErrorExample Error-Response:
 * HTTP status 401
 * {
 * "message": "Auth failed(Auth scripting error, please report this)"
 * }
 */

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
