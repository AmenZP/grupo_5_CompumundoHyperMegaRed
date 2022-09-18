const registerFormulario = document.getElementById("registerFormulario");
const inputs = document.querySelectorAll("#registerFormulario input");
const errorNameReg = document.getElementById("errorNameReg");
const errorLastnameReg = document.getElementById("errorLastnameReg");
const errorEmailReg = document.getElementById("errorEmailReg");
const errorPasswordReg = document.getElementById("errorPasswordReg");
const errorInputReg = document.getElementById("errorInputReg");

const expresiones = {
  usuario: /^[a-zA-Z]{2,16}$/, // Letras, numeros, guion y guion_bajo
  //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{8,12}$/, // 8 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 7 a 14 numeros.
};

const campos = {
  nameReg: false,
  lastnameReg: false,
  emailReg: false,
  passwordReg: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nameReg":
      if (expresiones.usuario.test(e.target.value)) {
        errorNameReg.style.display = "none";
        campos.nameReg = true;
      } else {
        campos.nameReg = false;
        errorNameReg.style.display = "block";
      }
      break;

    case "lastnameReg":
      if (expresiones.usuario.test(e.target.value)) {
        errorLastnameReg.style.display = "none";
        campos.lastnameReg = true;
      } else {
        errorLastnameReg.style.display = "block";
        campos.lastnameReg = false;
      }
      break;

    case "emailReg":
      if (expresiones.email.test(e.target.value)) {
        errorEmailReg.style.display = "none";
        campos.emailReg = true;
      } else {
        errorEmailReg.style.display = "block";
        campos.emailReg = false;
      }
      break;

    case "passwordReg":
      if (expresiones.password.test(e.target.value)) {
        errorPasswordReg.style.display = "none";
        campos.passwordReg = true;
      } else {
        errorPasswordReg.style.display = "block";
        campos.passwordReg = false;
      }
      break;
  }
};

inputs.forEach((input) => {

  input.addEventListener( "keyup", validarFormulario );
  input.addEventListener( "blur", validarFormulario );

});

registerFormulario.addEventListener("submit", (e) => {
  
  e.preventDefault();

  console.log( campos );

  if (
    campos.nameReg &&
    campos.lastnameReg &&
    campos.emailReg &&
    campos.passwordReg
  ) {
    registerFormulario.submit();
    alert("todo correcto");
  } else {
    // alert("revisa data");
    errorInputReg.style.display = "block";
  }
});
