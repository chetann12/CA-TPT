const jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisagood"; //Should be keep in environment variable

const fetchuser = (req, res, next) => {
  // Get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please login" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please login" });
  }
};
module.exports = fetchuser;
