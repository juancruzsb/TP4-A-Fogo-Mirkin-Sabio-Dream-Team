import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'
import { sequelize } from '../dbconfig.js';
import { Escucha } from '../models/escucha.models.js';

const EscuchoService = {}

EscuchoService.grabarEscucha = async (user, cancionID, date) => {
    const newEscucha = await Escucha.create({fecha_escucha: date, usuarioID: user.id, cancionID: cancionID} )
    return newEscucha;
}

EscuchoService.getEscucho = async (user) => {
    const escuchas = await Escucha.findAll({
            where:{ usuarioID: user.id }
    });
    return escuchas;
}

export default EscuchoService;