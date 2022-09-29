const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const models = require("../models/index");
const productsPath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

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

  addProduct: async (req, res) => {
    // res.send(req.body);
    // let nuevoProducto = {
    //   id: products[products.length - 1].id + 1,
    //   ...req.body,
    //   image: req.file ? req.file.filename : "default-image.png",
    // };

    let productByName = await models.Products.findOne({
      where: {
        name: req.body.name,
      },
    });

    console.log("productByName", productByName);

    // if (productByName === null) {
    //   return res.render("productAdd", {
    //     errors: {
    //       name: {
    //         msg: "Este producto ya esta registrado",
    //       },
    //     },
    //     oldData: req.body,
    //   });
    // }

    // if (errors.isEmpty()) {
    if (productByName) {
      const newProduct = {};

      const {
        body: { name, gpu, resolucion, cpu, ram, storage, precio },
        file: { filename },
      } = req;

      newProduct.name = name;
      newProduct.gpu = gpu;
      newProduct.resolution = resolucion;
      newProduct.cpu = cpu;
      newProduct.ram = ram;
      newProduct.storage = storage;
      newProduct.image = filename;
      newProduct.precio = precio;

      await models.Products.create(newProduct);
      console.log("newProduct", newProduct);

      res.redirect("/");
    }
  },

  // products.push(nuevoProducto);
  // fs.writeFileSync(productsPath, JSON.stringify(products, null, " "));
  // res.redirect("/");

  editProduct: async (req, res) => {
    let editProduct = await models.Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.render("productEdit", { editProduct: editProduct });
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
