const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  formAgregar,
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  indexProducts,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/profileImages"));
  },
  filename: (req, file, cb) => {
    const newFilename =
      "imgUser-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

router.get("/", indexProducts);

router.get("/productAdd", formAgregar);

router.post("/productAdd", upload.single("imagenProducto"), addProduct);

// router.post("/agregarProducto", addProduct);

// router.get("/productEdit", editProduct);

router.get("/productEdit/:id", editProduct);
router.put("/productEdit/:id", updateProduct);

// router.put("/productEdit", updateProduct);

// router.put("/prductEdit/:id", updateProduct);

router.delete("/productEdit/:id", deleteProduct);

// router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
