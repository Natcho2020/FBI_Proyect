console.log("Usando JS")

/**
 * Obtenemos información del formulario
 * 
 * Haremos solicitud fetch (post URL)
 */

document.querySelector("form[action='/SignIn']").addEventListener("submit", async (event) => {
  /** Prevenimos comportamiento por defecto */
  event.preventDefault()

  /** Obtenemos inputs de email y password */
  const { email, password } = event.target

  /** Enviamos usando fetch API y método POST la data */
  const response = await fetch("/SignIn", {
    method: 'POST', // Método POST
    headers: {
      'Content-Type': 'application/json' // Definimos comunicación de tipo json
    },
    body: JSON.stringify({ // Cuerpo de la solicitud
      email: email.value,
      password: password.value
    })
  })

  /** Transformamos el Stream de datos a un objeto JSON */
  const data = await response.json()

  /**
   * data = {html: 'string con html', token: jwt}
   */
  event.target.innerHTML = data.html // Cambiamos HTML interno
  sessionStorage.setItem('token', data.token) // Almacenamos token en sessionStorage

  event.target.children[2].addEventListener("click", getCasos)
})

/**
 * Callback/Listener
 * 
 * esta función obtiene los datos del endpoint
 * al hacer una solicitud get enviando las cabeceras
 * con Authorizarion: Bearer <token>
 */
async function getCasos(event) {
  event.preventDefault()
  
  const token = sessionStorage.getItem('token')
  const response = await fetch("/casos", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await response.json()
  event.target.offsetParent.innerHTML = crearCartas(data)
  console.log(event.target.offsetParent)
}

const crearCartas = (data) => {
  let text 
  
  data.forEach(el => {
    text += `<div class="card-body">
    ${el.id} - ${el.title} ${el.description}
  </div>`
  })

  const card = `<div class="card">
    ${text}
  </div>`

  return text
}