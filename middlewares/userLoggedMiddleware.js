// const User = require("../models/User");
const models = require("../models/index");

async function userLoggedMiddleware(req, res, next) {
  const emailInCookie = req.cookies.userEmailFinal;

  if (req.session.userLogged) {
    res.locals.islogged = true;
  } else {
    res.locals.islogged = false;
  }

  // const userFromCookie = await models.Users.findOne({
  //   where: {
  //     // email: "pipa@email.com"
  //     email: emailInCookie,
  //   },
  // });

  // if (userFromCookie) {
  //   res.locals.islogged = true;
  //   req.session.userLogged = userFromCookie.dataValues;
  // }
  // console.log("userFromCookie", userFromCookie.dataValues);
  // console.log("req.session, middleguer", req.session.userLogged);
  next();
}

module.exports = userLoggedMiddleware;
