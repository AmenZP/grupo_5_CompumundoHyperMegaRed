const controller = {
  home: function (req, res) {
    res.render("index", {
      locals: {
        isLogged: false,
      },
    });
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

  numeroVisitas: function (req, res) {
    if (req.session.numeroVIsitas == undefined) {
      req.session.numeroVIsitas = 0;
    }

    req.session.numeroVIsitas++;

    res.send("Session tiene el numero " + req.session.numeroVIsitas);
  },

  mostrarNumerosSession: function (req, res) {
    res.send("Session tiene el numero: " + req.session.numeroVIsitas);
  },
};

module.exports = controller;
