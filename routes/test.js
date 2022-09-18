const express = require("express");
const controller = require( "../database/sequelize" );

const router = express.Router();

router.get( "/user/:email", controller.buscarUnElemento );
router.get( "/users", controller.buscarTodos );

router.get( "/user/delete/:id", controller.borrarRegistro );

module.exports = router;