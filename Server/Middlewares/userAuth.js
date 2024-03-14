const jwt = require("jsonwebtoken");
module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(404).json({
      message: "No Token provider",
    });
  }
  //.split(" ")[1]
  const token = authHeader;
  if (!token) {
    return res.status(403).json({
      status: "Invalid Token ",
    });
  }
  jwt.verify(token, process.env.USER_SECRET_STR, (err, decode) => {
    if (err) {
      return res.status(401).json({
        message: "Unathorazed",
      });
    }
    req.email = decode.email;
    next();
  });
};
