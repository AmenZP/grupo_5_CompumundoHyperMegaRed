const agregarProductoFormulario = document.getElementById(
  "agregarProductoFormulario"
);
const inputs = document.querySelectorAll("#agregarProductoFormulario input");
const errorName = document.getElementById("errorName");

const expresiones = {
  name: /^.{5,40}$/, // 8 a 12 digitos.Letras y espacios, pueden llevar acentos.
};

const campos = {
  name: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "name":
      if (expresiones.name.test(e.target.value)) {
        errorName.style.display = "none";
        campos.name = true;
      } else {
        campos.name = true;
        errorName.style.display = "block";
      }
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

agregarProductoFormulario.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(campos);

  if (campos.name) {
    agregarProductoFormulario.submit();
    // alert("todo correcto");
  }
});

function isImg(imagenProducto) {
  let fileInput = document.getElementById(imagenProducto);

  fileInput.addEventListener("change", function () {
    let filePath = this.value;
    let extensionesPermitidas = /(.jpg|.jpeg|.png|)$/i;
    if (!extensionesPermitidas.exec(filePath)) {
      alert("Extensión no permitida. Utiliza: .jpeg/.jpg/.png/");
      fileInput.value = "";
      return false;
    } else {
      alert("Extensión correcta.");
      return true;
    }
  });
}
isImg("imagenProducto");
