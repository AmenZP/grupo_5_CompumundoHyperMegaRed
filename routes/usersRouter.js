const express = require("express");
const { body, check } = require("express-validator");
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/main");
const {
  create,
  store,
  update,
  edit,
  borrarUser,
  processLogin,
  profile,
  logout,
} = require("../controllers/usersController");

const router = express.Router();

//Validaciones
const validateCreateForm = [
  body("name").notEmpty().withMessage("Debes completar el campo de Nombre"),
  body("lastname")
    .notEmpty()
    .withMessage("Debes completar el campo de Apellido"),
  body("email")
    .isEmail()
    .withMessage("Debes completar el campo con un email valido"),
];
// Multer para subir, almacenas y renombrar imagenes
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

// FUNCION RECORDAR USUARIO EN LOGIN

/* GET users listing. */
// router.get("/register", create);

router.post(
  "/register",
  upload.single("imagenUsuario"),
  validateCreateForm,
  store
);

router.get("/:id", edit);

router.patch("/:id", update);

router.delete("/delete/:id", borrarUser);

router.get("/login", controller.login);

router.post("/login", processLogin);

router.get("/profile", profile);

router.get("/logout", logout);

module.exports = router;
