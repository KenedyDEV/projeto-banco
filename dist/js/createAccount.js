import dayjs, { Dayjs } from "dayjs";




const sessionCpf = sessionStorage.getItem("cpf");
document.getElementById("cpf").value = sessionCpf;


document.getElementById("cpf").style.color = "green";
document.getElementById("cpf").style.borderColor = "green";

document.getElementById("birthday").style.fontSize = "1.3em";


/*document.getElementById("birthday").value = dayjs()
  .subtract(18, "year")
  .format("YYYY-MM-DD");*/


document.getElementById("form").addEventListener("submit", function (ev) {
  ev.preventDefault();

  const name = document.getElementById("allName").value;
  const birthday = document.getElementById("birthday").value;
  const email = document.getElementById("email").value;
  const confirmEm = document.getElementById("confirmEm").value;

  try {
    verifieldName(name);
    verifieldBirthday(birthday);
    verifieldEmail(email, confirmEm);

    sessionStorage.setItem('name', name)
    sessionStorage.setItem('birthday', birthday)
    sessionStorage.setItem('email', email)

    window.location.href = '../html/address.html'
    
  } catch {
    alert("Verifique os dados e tente novamente.");
  }
});

document.getElementById("birthday").addEventListener('click', ()=>{
  setInterval(() => {
    verifieldBirthday(document.getElementById("birthday").value);
  }, 200);
})


function verifieldBirthday(birthday) {
  if (
    dayjs().diff(birthday, "year") < 18 ||
    dayjs().diff(birthday, "year") > 99
  ) {
    document.getElementById("birthday").classList.remove("success-message");
    document.getElementById("birthday").classList.add("error-message");
    document.querySelector(`#birthday-error`).textContent =
      "Idade não permitida.";
    document.querySelector(`#birthday-error`).style.color = "red";
    const err = new Error("Data de nascimento inválido.");
    throw err;
  } else {
    document.getElementById("birthday").classList.remove("error-message");
    document.getElementById("birthday").classList.add("success-message");
    document.querySelector(`#birthday-error`).textContent = "";
  }
}

document.getElementById("email").addEventListener("click", () => {
  setInterval(() => {
    verifieldEmail(
      document.getElementById("email").value,
      document.getElementById("confirmEm").value
    );
  }, 200);
});

function verifieldEmail(email, confEmail) {
  if (email !== confEmail || email === "" || confEmail === "") {
    document.getElementById("email").classList.remove("success-message");
    document.getElementById("confirmEm").classList.remove("success-message");
    document.getElementById("confirmEm").classList.add("error-message");
    document.querySelector(`#confirm-email-error`).textContent =
      "Ops. Está diferente do campo anterior.";
    document.querySelector(`#confirm-email-error`).style.color = "red";
    const err = new Error("Os emails não coincidem.");
    throw err;
  } else {
    document.getElementById("confirmEm").classList.remove("error-message");
    document.getElementById("confirmEm").classList.add("success-message");
    document.querySelector(`#confirm-email-error`).textContent = "";
    document.getElementById("email").classList.remove("error-message");
    document.getElementById("email").classList.add("success-message");
  }
}

document.getElementById("allName").addEventListener("click", () => {
  setInterval(() => {
    verifieldName(document.getElementById("allName").value);
  }, 200);
});

function verifieldName(name) {
  const splitName = name.split(" ");
  const filteredSplitName = splitName.filter((element) => element !== "");



  if (filteredSplitName.length < 2) {
    document.getElementById("allName").classList.remove("success-message");

    document.getElementById("allName").classList.add("error-message");

    document.querySelector(`#allName-error`).textContent =
      "Precisamos do seu nome completo.";

    document.querySelector(`#allName-error`).style.color = "red";
    const err = new Error("Os emails não coincidem.");
    throw err;
  } else {
    document.getElementById("allName").classList.remove("error-message");
    document.getElementById("allName").classList.add("success-message");
    document.querySelector("#allName-error").textContent = "";
  }
}



