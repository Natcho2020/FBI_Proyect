//Importar Rutas

import { Router } from "express";
import jwt from 'jsonwebtoken'
import { results } from "../data/agentes.js";

//Validamos credenciales del agente
// y entregamos JWT firmado en caso correcto

const router = Router()
router.post("/", async (req, res) => {

    //Sacamos credenciales del Front
    const { email, password } = req.body

    // Buscamos el agente y hacemos match en sus credenciales
    const userExists = results.find(user => user.email == email && user.password == password)

    //Validacion de Secreto
    const secreto = process.env.JWT_SECRET

    //Si usuario existe se firma 
    if (userExists) {

        //Se firma email , el secreto y se pone expiración a los 2 minutos
        const token = jwt.sign({ email: email }, secreto, { expiresIn: 120 })
        //Respuesta en caso de firma
        res.json({
            html: `<h1>Bienvenido</h1>
      <h2>${email}</h2>
      <a href="/casos">Ver Casos</a>
      `,

            //Convencion ya que token en algunos casos no los toma directamente como Json 
            token: token
        })
    } else {

        //Respuesta en caso de credenciales incorrectas
        res.status(401).send('Usuario no autorizado');
    }
})
//Exportamos todo el proceso
export { router }