import jwt from 'jsonwebtoken'

//Validación de credenciales 
export const Authorization = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        //Split divide el token 
        const token = authorization.split(" ")[1]
        //Decoded opera para que se hagan legible los valores
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        next() //se verifica y envia con next a la ruta siguiente
    } catch (error) {
        res.status(401).json({
            html: 'No autorizado'
        })
    }
}