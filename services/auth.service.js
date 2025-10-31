import {config, sequelize} from '../dbconfig.js'
import { Usuario } from '../models/usuario.models.js';


const authService = {}

authService.login = async (user) => {
  const result = await Usuario.findByPk(user.userid);
  console.log(result);
  return result;
}

authService.crearusuario = async (user) => {
  const newUser = await Usuario.create({nombre: user.nombre, id: user.id, password: user.password})
  return newUser;
}

export default authService