document.getElementById('form').addEventListener('submit', (ev)=>{
  ev.preventDefault()

  try {
    validatePassword()  
    usersData()
    window.location.href = '../html/welcome.html'
  } catch (error) {
    
  }
})

document.getElementById('confirmPw').addEventListener('click', ()=>{
  setInterval(() => {
  validatePassword()
}, 1000);
})


function validatePassword(){
  const passwd = document.getElementById('password')
  const cfPasswd  = document.getElementById('confirmPw')

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/


  if(passwd.value !== cfPasswd.value || !regex.test(passwd.value)){
    const err = new Error('As senhas não condizem.')
    document.getElementById('confirm-pw-error').textContent = err.message
    passwd.classList.add('error-message')
    cfPasswd.classList.add('error-message')
    throw err
  } else{
    document.getElementById('confirm-pw-error').textContent = ''
    passwd.classList.add('success-message')
    cfPasswd.classList.add('success-message')
  }
}

async function usersData(){

  const newUser = {
    cpf: sessionStorage.getItem('cpf'),
    name: sessionStorage.getItem('name'),
    birthday: sessionStorage.getItem('birthday'),
    email: sessionStorage.getItem('email'),
    passwd: document.getElementById('password').value,
    address: {
      house: sessionStorage.getItem('house'),
      street: sessionStorage.getItem('street'),
      neighbourhood: sessionStorage.getItem('neighbourhood'), 
      city: sessionStorage.getItem('city'),
      state: sessionStorage.getItem('state')
    }
  }

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(newUser)
  })

  const savedOperation = await response.json()
  console.log(savedOperation)
}