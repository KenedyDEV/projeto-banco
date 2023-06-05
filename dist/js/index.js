import CPF from 'cpf-check';


document.getElementById("form").addEventListener("submit", function (ev) {
  ev.preventDefault();

  try {
    validateCPF(document.getElementById("cpf").value);
    sessionStorage.setItem("cpf", document.getElementById("cpf").value);
    window.location.href = "../html/createAccount.html";
  } catch (error) {
    console.log('CPF inválido!')
  }
});

document.getElementById("cpf").addEventListener("click", function () {
  setInterval(() => {
    validateCPF(document.getElementById("cpf").value);
  }, 200);
});

function validateCPF(cpf) {
  if (cpf.length < 11) {
    const err = new Error("CPF inválido!");
    document.getElementById("cpf").classList.remove("success-message");
    document.getElementById("cpf").classList.add("error-message");
    document.querySelector("#cpf-error").textContent = "Insira um CPF válido!";
    document.querySelector("#cpf-error").style.color = "red";
    document
      .getElementById("btn-continue")
      .classList.remove("btn-continue-habilited");
    document.getElementById("btn-continue").classList.add("btn-continue");
    document.getElementById("btn-continue").disabled = true;
    document.getElementById("cpf").style.color = "red";
    throw err;
  } else {
    document.getElementById("cpf").classList.remove("error-message");
    document.getElementById("cpf").classList.add("success-message");
    document.getElementById("cpf").style.color = "green";
    document.querySelector("#cpf-error").textContent = "";
    document.getElementById("btn-continue").classList.remove("btn-continue");
    document
      .getElementById("btn-continue")
      .classList.add("btn-continue-habilited");
    document.getElementById("btn-continue").disabled = false;
    document.getElementById("cpf").value = fixCpfFormat()
    
  }
}



function fixCpfFormat() {
   return CPF.format(document.getElementById("cpf").value)
}

