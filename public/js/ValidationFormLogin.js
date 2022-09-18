const loginForm = document.getElementById("loginForm");
const inputs = document.querySelectorAll("#loginForm input");
const errorEmailLogin = document.getElementById("errorEmailLogin");
const errorNameReg = document.getElementById("errorNameReg");
const errorSubmitLogin = document.getElementById("errorSubmitLogin");

const expresiones = {
  usuario: /^[a-zA-Z]{2,16}$/, // Letras, numeros, guion y guion_bajo
  //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{8,12}$/, // 8 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 7 a 14 numeros.
};

const campos = {
  emailLogin: false,
  passwordLogin: false,
};

const validarFormularioLogin = (e) => {
  switch (e.target.name) {
    case "emailLogin":
      if (expresiones.email.test(e.target.value)) {
        errorEmailLogin.style.display = "none";
        campos[emailLogin] = true;
      } else {
        errorEmailLogin.style.display = "block";
        campos[emailLogin] = false;
      }
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormularioLogin);
  input.addEventListener("blur", validarFormularioLogin);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.emailLogin && campos.passwordLogin) {
    this.Submit();
  } else {
    errorSubmitLogin.style.display = "block";
  }
});
