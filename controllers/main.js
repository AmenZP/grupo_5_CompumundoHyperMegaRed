const controller = {
  home: function (req, res) {
    res.render("index", {});
  },

  carrito: function (req, res) {
    res.render("carrito", {});
  },

  productDetail: function (req, res) {
    res.render("productDetail");
  },

  login: function (req, res) {
    res.render("login", {});
  },

  registro: function (req, res) {
    res.render("registro", {});
  },
};

module.exports = controller;
