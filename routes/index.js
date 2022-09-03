const express = require("express");
const {
  create: usersControllerCreate,
  login: usersControllerLogin,
  logout: usersControllerLogout,
  profile: usersControllerProfile,
} = require("../controllers/usersController");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const controller = require("../controllers/main");
const router = express.Router();

/* GET home page. */
router.get("/", controller.home);

router.get("/carrito", controller.carrito);

router.get("/productDetail", controller.productDetail);

router.get("/login", guestMiddleware, usersControllerLogin, controller.login);

router.get("/registro", guestMiddleware, controller.registro);

router.get("/productEdit", controller.productEdit);

router.get("/productAdd", controller.productAdd);

router.get("/editarUsuario", controller.editarUsuario);

router.get("/numeroVisita", controller.numeroVisitas);

router.get("/profile", authMiddleware, usersControllerProfile);

router.get("/logout", usersControllerLogout);

router.get("/mostrarNumeroSession", controller.mostrarNumerosSession);

module.exports = router;
