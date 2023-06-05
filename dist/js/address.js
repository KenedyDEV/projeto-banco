const cep = document.getElementById("cep");
const street = document.getElementById("street")
const neighbourhood = document.getElementById("neighbourhood")
const city = document.getElementById("city")
const state = document.getElementById("state")


document.getElementById("form").addEventListener("submit", (ev) => {
  ev.preventDefault();

  try {
    verifieldCEP();

    sessionStorage.setItem('cep', cep.value)
    sessionStorage.setItem('house', document.getElementById('house').value + document.getElementById('complement').value)
    sessionStorage.setItem('street', street.value)
    sessionStorage.setItem('neighbourhood', neighbourhood.value)
    sessionStorage.setItem('city', city.value)
    sessionStorage.setItem('state', state.value)

    window.location.href = '../html/password.html'
  } catch (error) {}
});



cep.addEventListener("input", () => {
  const maxLength = 8;

  if (cep.value.length > maxLength) {
    cep.value = cep.value.slice(0, maxLength);
  }
});

function verifieldCEP() {

    fixCEP()
      .then((res) => {

        street.value = res.logradouro;
        neighbourhood.value = res.bairro;
        city.value = res.localidade;
        state.value = res.uf;

        street.classList.add("success-message");
        neighbourhood.classList.add("success-message");
        city.classList.add("success-message");
        state.classList.add("success-message");
        document.getElementById("cep-error").textContent = "";
        cep.classList.remove("error-message");
        cep.classList.add("success-message");

      })
      .catch(() => {
        cep.classList.remove("success-message");
        cep.classList.add("error-message");
        street.value = "";
        neighbourhood.value = "";
        city.value = "";
        state.value = "";
        document.getElementById("cep-error").textContent = "CEP não encontrado";
      });
  }


document.getElementById("cep").addEventListener("click", () => {
  setInterval(() => {
    verifieldCEP();
  }, 3000);
});

async function fixCEP() {
  const response = await fetch(
    `https://viacep.com.br/ws/${document.getElementById("cep").value}/json/`
  );
  const cep = await response.json();
  if (cep.cep === undefined) {
    const err = new Error("CEP não encontrado na base de dados!");
    return Promise.reject(err);
  }
  return cep;
}
