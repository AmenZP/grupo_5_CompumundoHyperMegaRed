const User = require("../models/User");

function userLoggedMiddleware(req, res, next) {
  console.log("Pasando por middleware");
  res.locals.islogged = false;
  console.log("Locals", res.locals.islogged);
  const emailInCookie = req.cookies.userEmail;
  const userFromCookie = User.findByField("email", emailInCookie);
  // console.log("userFromCookie", userFromCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.islogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userLoggedMiddleware;
