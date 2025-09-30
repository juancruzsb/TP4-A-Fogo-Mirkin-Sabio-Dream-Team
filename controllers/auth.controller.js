import authService from '../services/auth.service.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
const authController = {}

authController.login = async (req, res) => {
    let user = req.body;
    if (!user.password || !user.userid) {
        return res.status(400).json({ mesagge: "Debe completar todos los campos" })
      }
    try {
        const result = await authService.login(user);
        

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
          }
      
          let dbUser = result.rows[0];
          const passOK = await bcrypt.compare(user.password, dbUser.password);
      
          const payload = {
            id: dbUser.id,
            name: dbUser.nombre,
            rol: dbUser.rol
          }
      
          const options = {
            expiresIn: '100h',
            issuer: 'ort'
          }
      
          const token = jwt.sign(payload, process.env.secretKey, options);
      
          if (passOK)
          {
            res.send({nombre: dbUser.nombre, token: token});
          } else { res.send("Clave invalida") }
      
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: e.message})
    }
}

authController.crearusuario = async (req, res) => {
  const user = req.body;

  if (!user.nombre || !user.password || !user.userid) {
    return res.status(400).json({ mesagge: "Debe completar todos los campos" })
  }
  try { 
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    let result = await authService.crearusuario(user);
    console.log("Rows creadas: ", result.rowCount);
    res.send(result.rows);
  }
  catch(e) {
    return res.status(500).json({ mesagge: e.mesagge });
  }

}

export default authController