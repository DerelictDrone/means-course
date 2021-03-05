const jwt = require("jsonwebtoken");
const cfg = require("../connection_config")

module.exports = (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, cfg.tknscrt);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({message: 'Authentication check failed(You are not authenticated)'})
  }

};
