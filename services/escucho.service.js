import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'

const EscuchoService = {}

EscuchoService.grabarEscucha = async (user, cancionID) => {
    const client = new Client(config);
    await client.connect();

    const usuarioID = user.id;

    const rows = await client.query('INSERT INTO escucha VALUES ($1, $2) RETURNING *' [usuarioID, cancionID]);
    await client.end()

    return rows;
}

export default EscuchoService