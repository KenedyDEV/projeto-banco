import CPF from "cpf-check";

const cpf = document.getElementById("cpf");

document.getElementById("form").addEventListener("submit", function (ev) {
  ev.preventDefault();

  try {
    verifieldAccount().then(result=>{
      if(result){
        window.location.href = "../html/home.html";
      } else{
        alert('Verifique os dados e tente novamente')
      }
    }).catch(error =>{
      console.log(error)
    }) 
  } catch (error) {
    console.log('fail')
  }
});

document.getElementById("eye").addEventListener("click", function () {
  if (document.getElementById("password").type === "password") {
    document.getElementById("password").type = "text";
    document.getElementById("eye").src =
      "../html/img/a7f7b1459e852f4b207d15e51a324d70-removebg-preview (2).png";
  } else if (document.getElementById("password").type === "text") {
    document.getElementById("password").type = "password";
    document.getElementById("eye").src =
      "../html/img/c2bba84371248dee542d499d80ea9754 (1).png";
  }
});

cpf.addEventListener("input", () => {
  const maxLength = 11;

  if (cpf.value.length > maxLength) {
    cpf.value = cpf.value.slice(0, maxLength);
  }
});

async function verifieldAccount() {
  const data = await getUsers();
  const findUserbyCPF = data.find((user) => user.cpf === fixCpfFormat());
  const findUserbyPasswd = data.find(
    (user) => user.passwd === document.getElementById("password").value
  );

  if (cpf.value.length !== 11) {
    const err = new Error("CPF inválido");
    document.getElementById("cpf-error").textContent = err.message;
    cpf.classList.add("error-message");
    document.getElementById("password").value = ''
    throw err;
  } else if (!findUserbyCPF || !findUserbyPasswd) {
    const err = new Error("Usuário não encontrado!");
    document.getElementById("cpf-error").textContent = err.message;
    cpf.classList.add("error-message");
    document.getElementById("password").value = ''
    throw err;
  } else if (findUserbyCPF.id !== findUserbyPasswd.id) {
    const err = new Error("Email ou senha incorreta!");
    document.getElementById("cpf-error").textContent = err.message;
    cpf.classList.add("error-message");
    document.getElementById("password").value = ''
    throw err;
  } 

  return true
}

function fixCpfFormat() {
  return CPF.format(document.getElementById("cpf").value);
}

async function getUsers() {
  const response = await fetch("http://localhost:3000/users");

  const users = await response.json();

  return users;
}
