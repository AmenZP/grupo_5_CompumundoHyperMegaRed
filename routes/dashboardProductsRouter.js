const express = require("express");
const controller = require("../database/dashboardProducts");

const router = express.Router();

router.get("/:id", controller.buscarUnElemento);
router.get("/", controller.buscarTodos);

router.get("/delete/:id", controller.borrarRegistro);

module.exports = router;
