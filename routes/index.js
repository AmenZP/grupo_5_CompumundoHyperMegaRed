var express = require("express");
var router = express.Router();

const controller = require("../controllers/main");

/* GET home page. */
router.get("/", controller.home);

router.get("/carrito", controller.carrito);

router.get("/productDetail", controller.productDetail);

router.get("/login", controller.login);

router.get("/registro", controller.registro);

router.get("/productEdit", controller.productEdit);

router.get("/productAdd", controller.productAdd);

module.exports = router;
