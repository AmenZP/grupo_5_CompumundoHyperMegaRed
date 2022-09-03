const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { clearScreenDown } = require("readline");
const { CLIENT_RENEG_LIMIT } = require("tls");

const pathUsers = path.join(__dirname, "../data/userData.json");
const users = JSON.parse(fs.readFileSync(pathUsers, "utf-8"));

module.exports = {
  create: (req, res) => {
    res.render("registro");
  },

  store: (req, res) => {
    // Valdacion de errores con express validator
    let errors = validationResult(req);
    const userInDB = User.findByField("email", req.body.email);
    console.log("userDB", userInDB);

    if (userInDB) {
      return res.render("registro", {
        errors: {
          email: {
            msg: "Este usuario ya esta registrado",
          },
        },
        oldData: req.body,
      });
    }

    if (errors.isEmpty()) {
      // Validacion de imagenes con Multer para nuevo usuario
      if (req.file) {
        let usersIMG = req.body;
        usersIMG.image = req.file.filename;

        let nuevoUsuario = {
          id: users[users.length - 1].id + 1,
          ...req.body,
          password: bcryptjs.hashSync(req.body.password, 10),
        };

        console.log("nuevoUsuario", nuevoUsuario);
        users.push(nuevoUsuario);
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, " "));
        res.redirect("/login");
      }
    } else {
      res.render("registro", { errors: errors.array(), old: req.body });
    }
  },

  login: function (req, res) {
    return res.render("login");
  },

  processLogin: (req, res) => {
    // console.log("process", req.session);
    let UserToLogin = User.findByField("email", req.body.email);

    if (UserToLogin) {
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        UserToLogin.password
      );
      if (isOkThePassword) {
        delete UserToLogin.password;
        req.session.userLogged = UserToLogin;
        // console.log("userlogged", req.session.userLogged);

        if (req.body.rec_usuario) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 1 });
        }

        return res.redirect("/profile");
      }
      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son invalidas ",
          },
        },
      });
    }
    return res.render("login", {
      errors: {
        email: {
          msg: "no encontro email ",
        },
      },
    });
  },

  profile: (req, res) => {
    console.log("cuki", req.cookies.userEmail);
    // console.log("estas en perfil", req.session.userLogged);
    res.render("profile", {
      user: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  edit: (req, res) => {
    let id = req.params.id;
    let userEdit = users.find((user) => user.id == id);
    res.render("profile", { userEdit });
    //res.send(userEdit)
  },

  update: (req, res) => {
    let id = req.params.id;
    let userEdit = users.find((user) => user.id == id);

    userEdit = {
      id: userEdit.id,
      name: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      pass_confirm: req.body.pass_confirm,
    };

    let newUsers = users.map((user) => {
      if (user.id == userEdit.id) {
        return (user = { ...userEdit });
      }
      return user;
    });
    fs.writeFileSync(pathUsers, JSON.stringify(newUsers, null, " "));
    res.redirect("/");
  },

  borrarUser: (req, res) => {
    let id = req.params.id;
    let finalUsers = users.filter((usuario) => usuario.id != id);
    fs.writeFileSync(pathUsers, JSON.stringify(finalUsers, null, " "));
    res.redirect("/");
  },
};
