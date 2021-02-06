const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")


const Post = require('./models/post');
const app = express();


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
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use('/api/posts', (req, res, next) => {
  console.log('Posts got')
  const posts = [
    {id: 'a1',title: "Post 1",content: "Content 1"},
    {id: 'a2',title: "Post 2",content: "Content 2"},
    {id: 'a3',title: "Post 3",content: "Content 3"}
  ]
  res.status(200).json({
    message: 'Posts fetched properly!',
    posts: posts
  });
})

module.exports = app;
