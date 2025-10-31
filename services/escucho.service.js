import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'
import { sequelize } from '../dbconfig.js';
import { Escucha } from '../models/escucha.models.js';

const EscuchoService = {}

EscuchoService.grabarEscucha = async (user, cancionID, date) => {
    const newEscucha = await Escucha.create({fecha_escucha : date.fecha_escucha},{usuarioID : user.id},{cancionID : cancionID} )
    console.log(newEscucha);
    return rows
}

EscuchoService.getEscucho = async (user) => {
    const escuchas = await Escucha.findAll({
            where:{ usuarioID:user.id }
    })
    console.log('Escuchas: ', JSON.stringify(escuchas,null,2))
    return rows
}

export default EscuchoService