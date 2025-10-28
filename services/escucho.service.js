import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'

const EscuchoService = {}

EscuchoService.grabarEscucha = async (user, cancionID, date) => {
    const client = new Client(config);
    await client.connect();
        const rows = await client.query('INSERT INTO escucha ("usuarioID", "cancionID", fecha-escucha) VALUES ($1, $2, $3) RETURNING *', [user.id, cancionID, date]);
        await client.end()
        return rows;

}
 EscuchoService.getEscucho = async (user) => {
    const client = new Client(config);
    await client.connect();
    const rows = await client.query('SELECT * FROM escucha WHERE "usuarioID" = $1', [user.id])
    await client.end();
    return rows
  
}

export default EscuchoService