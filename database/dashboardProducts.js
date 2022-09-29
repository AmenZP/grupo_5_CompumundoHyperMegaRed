const models = require("../models/index");
const productsModel = "Products";

const controller = {
  buscarUnElemento: async (req, res) => {
    const id = req.params.id;

    const product = await models[productsModel].findOne({
      where: {
        id: id,
      },
    });
    res.json({
      response: 200,
      data: product,
    });
  },

  buscarTodos: async (req, res) => {
    const products = await models[productsModel].findAll();

    res.json({
      response: 200,
      data: products,
      count: products.length,
    });
  },

  borrarRegistro: async (req, res) => {
    const id = req.params.id;

    await models[productsModel].destroy({
      where: {
        id: id,
      },
    });

    res.json({
      response: 200,
      data: null,
    });
  },
};

module.exports = controller;
