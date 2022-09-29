const express = require("express");
const controller = require("../database/dashboardUsers");

const router = express.Router();

router.get("/:email", controller.buscarUnElemento);
router.get("/", controller.buscarTodos);

router.get("/delete/:id", controller.borrarRegistro);

module.exports = router;
