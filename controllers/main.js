const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  home: (req, res) => {
    const productosVista = products.filter((productos) => {
      return productos.id < 100;
    });
    console.log("prod", productosVista);
    res.render("index", { toThousand, productosVista });
    // res.render("index", {locals: { isLogged: false }});
  },

  carrito: function (req, res) {
    res.render("carrito", {});
  },

  productDetail: function (req, res) {
    const id = req.params.id;
    let producto = products.filter((producto) => {
      return producto.id == id;
    });

    producto = producto[0];
    // res.send(producto);
    res.render("productDetail", { title: producto.name, producto });
  },

  login: function (req, res) {
    res.render("login", {});
  },

  registro: function (req, res) {
    res.render("registro", {});
  },

  // productEdit: function (req, res) {
  //   res.render("productEdit");
  // },

  // productAdd: function (req, res) {
  //   res.render("productAdd");
  // },

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
