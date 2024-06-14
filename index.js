import express from 'express'
import { router as login } from './routes/login.js'
import { router as casos } from './routes/casos.js'
const app = express()

app.use(express.json())
app.use(express.static('static')) // Ruta pública

// Importamos Rutas que usaremos
app.use("/SignIn", login)
app.use("/casos", casos)

app.listen(3000, () => {
    console.log("Aplicación corriendo en puerto 3000")
})




