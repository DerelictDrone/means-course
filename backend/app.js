const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const mgcfg = require("../connection_config.js")
const Post = require('./models/post');
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
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(res => console.log("We are now connected to the DB")
).catch(err => console.log(err))

app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post)
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use('/api/posts', async (req, res, next) => {
  console.log('Posts got!')
  let posts = await Post.find({}).exec();

  res.status(200).json({
  message: 'Posts fetched properly!',
  posts: posts
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id)
  res.status(200).json({ message: "Post kicked the bucket" });
})

module.exports = app;
