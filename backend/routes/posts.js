const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');
const cfg = require("../../connection_config.js");
const urlFilt = require ("../urlfilters.js")
const checkAuth = require('../middleware/check-auth')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type!')
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = urlFilt.filterURL(file.originalname)
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post(
  "",
  checkAuth,
 multer({storage: storage}).single("image"), (req, res, next) => {
  const url = cfg.reqprotocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath:  url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post
  .save()
  .then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    });
  })
    .catch(error => {
      res.status(500).json({
       message: "Creating a post failed(unknown error)"
     });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pgsz;
  const currentPage = +req.query.pg;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    Post.estimatedDocumentCount()
        .then(count => res.status(200).json({
            message: 'Posts fetched properly!',
            posts: fetchedPosts,
            maxPosts: count
        }));
  });
})
router.put("/:id",
checkAuth,
multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = cfg.reqprotocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  })
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    if (result.nModified > 0){
      res.status(200).json({message: 'Update succeeded!'})}
    else{
      res.status(401).json({ message: "Update post failed(you are unauthorized)" })
    }
    })
    .catch(error => {
      res.status(500).json({
        message: "Update post failed(database may be down)"
      });
    })
});

router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "WHERE POST AAAAAAA"})
    }
  })
  .catch(error => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found(ID may be wrong) "});
      }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching post failed(server may be down)"
      });
    });
  });


router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0){
      res.status(200).json({message: 'Deletion Successful'})}
    else{
      res.status(401).json({ message: "Not authorized!" });
    }
  }
).catch(error => {
  res.status(500).json({
   message: "Deleting post failed(server may be down?)"
    });
  });
});
module.exports = router;
