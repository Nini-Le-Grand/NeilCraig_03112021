const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.id && req.body.id != userId) {
      res.send({error: "invalid user id"})
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Invalid request!"});
  }
};