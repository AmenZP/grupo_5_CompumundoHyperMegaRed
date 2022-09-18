const models = require( "../models/index" );

const controller = {

    buscarUnElemento: async ( req, res ) => {

        let email = req.params.email;

        let user = await models[ "Users" ].findOne({
            where: {
                email: email
            }
        });

        res.json({
            response: 200,
            data: user
        });

    },

    buscarTodos: async ( req, res ) => {

        let users = await models[ "Users" ].findAll();

        res.json({
            response: 200,
            data: users
        });

    },

    borrarRegistro: async( req, res ) => {

        let id = req.params.id;

        await models[ "Users" ].destroy({
            where: {
                id: id
            }
        });

        res.json({
            response: 200,
            data: null
        });

    },

    actualizarRegistro: async( req, res ) => {

        // Alondra
        let name = req.body.nameReg;

        await models[ "Users" ].update({

            name: name

        },
        {
            where: {
                id: id
            }
        });

        res.json({
            response: 200,
            data: null
        });
    }

}

module.exports = controller;