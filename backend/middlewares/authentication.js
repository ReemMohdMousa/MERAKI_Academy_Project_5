const jwt = require("jsonwebtoken");

// This function checks if the user logged in
const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      res.status(403).json({ message: "forbidden" });

    const token = req.headers.authorization.split(" ").pop();

    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        req.token = result;
        next();
      }
    });
  } catch (error) {
    res.status(403).json({ message: "forbidden" });
  }
};

module.exports = authentication;
