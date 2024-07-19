const jwt = require("jsonwebtoken");

exports.adminjwt = (req, res, next) => {
  if (req.cookies && req.cookies.AdminToken) {
    jwt.verify(req.cookies.AdminToken, "galaxy11cafe@2024", (err, data) => {
      req.admin = data;
      next();
    });
  } else {
    next();
  }
};
