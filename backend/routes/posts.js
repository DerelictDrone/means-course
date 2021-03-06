const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');
const cfg = require("../connection_config.js");
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

/**
 * @api {post} /api/posts
 * @apiName UploadPost
 * @apiGroup Posts
 *
 * @apiParam {array} post [title: string, content: string, creator: number]
 *
 * @apiSuccess {string} message: Post added successfully!
 *
 * @apiSuccessExample Success-Response:
 * HTTP status code 200
 * {
 *   "message": "Post added successfully"
 * }
 *
 * @apiError CreateFailed
 *
 * @apiErrorExample Error-Response:
 * HTTP status code 500
 * {
 * "message": "Creating a post failed(unknown error)"
 * }
 */

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

/**
 * @api {get} /api/posts?pgsz=2&pg=1
 * @apiName GetPosts
 * @apiGroup Posts
 *
 * @apiParam pgsz PGSZ, short for Page Size controls how many posts the api will return
 * @apiParam pg PG, short for Page controls which "page" of posts the api will return, in conjunction with PGSZ.
 *
 * @apiSuccess {string} message: Posts fetched successfully!
 *
 * @apiSuccessExample Success-Response:
 *     HTTP status 200
 * {
 *   "message": "Posts fetched properly!",
 *   "posts": [
 *     {
 *       "_id": "603eb923bdff774770aaa63c",
 *       "title": "I am a post",
 *       "content": "I contain many words",
 *       "imagePath": "http://phpminor.duckdns.org:28902/images/example-1614723363364.png",
 *       "creator": "60383facbb8a2d4fa464fd3e",
 *       "__v": 0
 *     },
 *     {
 *       "_id": "603ec0463b13d31eac9e04cb",
 *       "title": "I am also a post",
 *       "content": "I contain words too",
 *       "imagePath": "http://phpminor.duckdns.org:28902/images/example-2-1614725190796.png",
 *       "creator": "603e9f5535da9249247ac2f2",
 *       "__v": 0
 *     }
 *   ],
 *   "maxPosts": 2
 * }
 *
 * @apiError None. There is no error handling on the get route, any errors will result with a blank screen.
 *
 * @apiErrorExample Error-Response:
 * A blank screen, a 500 error, or cannot resolve this url.
 */

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

/**
 * @api {put} /api/posts/:id
 * @apiName UpdatePost
 * @apiGroup Posts
 *
 * @apiParam id(number) The ID number of the post we're going to be editing.
 *
 * @apiSuccess {string} Update succeeded!
 *
 * @apiSuccessExample Success-Response:
 * HTTP status 200
 * {
 *   "message": "Update succeeded!",
 * }
 *
 * @apiError UpdateFailed(NoAuth)
 *
 * @apiErrorExample Error-Response:
 * HTTP status 401
 * {
 *   "message": "Update post failed(you are unauthorized)"
 * }
 * @apiError UpdateFailed(unknown)
 *
 * @apiErrorExample Error-Response:
 * HTTP status 500
 * {
 *   "message": "Update post failed(database may be down)"
 * }
 */

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


/**
 * @api {put} /api/posts/:id
 * @apiName GetSinglePost
 * @apiGroup Posts
 *
 * @apiParam id(number) The ID number of the post we're going to be getting.
 *
 * @apiSuccess {string} Only the post is returned
 *
 * @apiSuccessExample Success-Response:
 * HTTP status 200
 * {
 *  "_id": "603eb923bdff774770aaa63c",
 *  "title": "I am a single post",
 *  "content": "I contain content, that is for sure",
 *  "imagePath": "http://phpminor.duckdns.org:28902/images/example-1614723363364.png",
 *  "creator": "60383facbb8a2d4fa464fd3e",
 *  "__v": 0
 * }
 *
 * @apiError PostNotFound
 *
 * @apiErrorExample Error-Response:
 * HTTP status 404
 * {
 * "message": "Post not found(ID may be wrong)"
 * }
 * @apiError FetchFailed
 *
 * @apiErrorExample Error-Response:
 * HTTP status 500
 * {
 * "message": "Fetching post failed(ID may be wrong)"
 * }
 */


router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found(ID may be wrong)"}) // this error doesn't seem to appear
    }
  })
  .catch(error => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found(ID may be wrong)"}); // and neither does this one, funky isn't it?
      }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching post failed(ID may be wrong)"
      });
    });
  });


  /**
 * @api {delete} /api/posts/:id
 * @apiName DeletePost
 * @apiGroup Posts
 *
 * @apiParam id(number) The ID number of the post we're going to be deleting
 *
 * @apiDescription Deletes a post, the ID in the URL is the post we will delete, needs a users token in the local storage(thus, to be signed in) to work however.
 *
 * @apiSuccess {string} Deletion Successful
 *
 * @apiSuccessExample Success-Response:
 * HTTP status 200
 * {
 * "message": "Deletion Successful"
 * }
 *
 * @apiError NotAuthorized
 *
 * @apiErrorExample Error-Response:
 * HTTP status 401
 * {
 * "message": "Not authorized!"
 * }
 * @apiError FetchFailed
 *
 * @apiErrorExample Error-Response:
 * HTTP status 500
 * {
 * "message": "Deleting post failed(server may be down?)"
 * }
 */

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
