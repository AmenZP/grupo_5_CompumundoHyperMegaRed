const express = require("express");

const path = require("path");

const app = express();

const port = 3020;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server Up! ${port}`);
});

app.use(express.static(path.resolve("./views/index.html")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

app.get("/carrito", (re, res) => {
  res.sendFile(path.resolve("./views/carrito.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("./views/login.html"));
});

app.get("/productDetail", (req, res) => {
  res.sendFile(path.resolve("./views/productDetail.html"));
});

app.get("/registro", (req, res) => {
  res.sendFile(path.resolve("./views/registro.html"));
});
