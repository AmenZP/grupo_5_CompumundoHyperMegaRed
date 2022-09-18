const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  indexProducts: (req, res) => {
    // const products = products.filter((producto) => {
    //   return producto.id <= 100;
    // });
    res.render("index");
  },

  formAgregar: (req, res) => {
    res.render("productAdd");
  },

  addProduct: (req, res) => {
    // res.send(req.body);
    let nuevoProducto = {
      id: products[products.length - 1].id + 1,
      ...req.body,
      image: req.file ? req.file.filename : "default-image.png",
    };
    products.push(nuevoProducto);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));
    res.redirect("/");
  },

  editProduct: (req, res) => {
    // res.render("productEdit");
    let productosinDB = products;
    let id = req.params.id;
    let editProduct = products.find((producto) => producto.id == id);
    // res.send(editProduct);
    res.render(
      "productEdit",
      { editProduct: editProduct }
      // { productosinDB: productosinDB }
    );
    console.log("productosindb", editProduct);
  },

  updateProduct: (req, res) => {
    let id = req.params.id;
    let editProduct = products.find((producto) => producto.id == id);

    editProduct = {
      id: editProduct.id,
      ...req.body,
      image: editProduct.image,
    };
    let newProducts = products.map((producto) => {
      if (producto.id === editProduct.id) {
        return (producto = { ...editProduct });
      }
      return producto;
    });
    fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, " "));
    res.redirect("/");
  },
  deleteProduct: (req, res) => {
    let id = req.params.id;
    let finalProducts = products.filter((producto) => producto.id != id);
    fs.writeFileSync(productsPath, JSON.stringify(finalProducts, null, " "));
    res.redirect("/");
  },
};