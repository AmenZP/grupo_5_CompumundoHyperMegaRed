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

  productEdit: function (req, res) {
    res.render("productEdit");
  },

  productAdd: function (req, res) {
    res.render("productAdd");
  },

  editarUsuario: function (req, res) {
    res.render("editarUsuario");
  },
};

module.exports = controller;
