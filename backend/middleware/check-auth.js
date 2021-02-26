const jwt = require("jsonwebtoken");
const cfg = require("../../connection_config")

module.exports = (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, cfg.tknscrt)
    next();
  } catch (error) {
    res.status(401).json({message: 'Auth failed!'})
  }

};
