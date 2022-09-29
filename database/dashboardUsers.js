const models = require( "../models/index" );

const controller = {
  buscarUnElemento: async (req, res) => {
    const email = req.params.email;

    const user = await models["Users"].findOne({
      where: {
        email: email,
      },
      attributes: { exclude: ["password", "category"] },
    });

    res.json({
      response: 200,
      data: user,
    });
  },

  buscarTodos: async (req, res) => {
    const users = await models["Users"].findAll({
      attributes: { exclude: ["password", "category"] },
    });

    res.json({
      response: 200,
      data: users,
    });
  },

  borrarRegistro: async (req, res) => {
    const id = req.params.id;

    await models["Users"].destroy({
      where: {
        id: id,
      },
    });

    res.json({
      response: 200,
      data: null,
    });
  },

  actualizarRegistro: async (req, res) => {
    const name = req.body.nameReg;

    await models["Users"].update(
      {
        name: name,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({
      response: 200,
      data: null,
    });
  },
};

module.exports = controller;