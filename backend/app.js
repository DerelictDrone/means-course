const path = require("path")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const mgcfg = require("../connection_config.js");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

console.log("mongodb://" + mgcfg.mongopostuser + ":" + mgcfg.mongopostpass + "@" + mgcfg.mongoserver + ":" + mgcfg.mongoport + mgcfg.mongoargs)
mongoose.connect(
  "mongodb://"
  + mgcfg.mongopostuser
  + ":"
  + mgcfg.mongopostpass
  + "@"
  + mgcfg.mongoserver
  + ":"
  + mgcfg.mongoport
  + mgcfg.mongoargs,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(res => console.log("We are now connected to the DB")
).catch(err => console.log(err))

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
