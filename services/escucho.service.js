import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'

const EscuchoService = {}

EscuchoService.grabarEscucha = async (user, cancionID) => {
    const client = new Client(config);
    await client.connect();

    const usuarioID = user.id;
    const escuchas = await client.query('SELECT * FROM escucha WHERE "usuarioID"=$1 AND "cancionID"=$2',[usuarioID, cancionID]);

    if(escuchas.rowCount === 0)
    {
        const rows = await client.query('INSERT INTO escucha ("usuarioID", "cancionID", reproducciones) VALUES ($1, $2, 1) RETURNING *', [usuarioID, cancionID]);
        await client.end()
        return rows;
        
    }
    else 
    {
        const rows = await client.query('UPDATE escucha SET reproducciones = $1 WHERE id = $2 RETURNING *', [escuchas.rows[0].reproducciones+1, escuchas.rows[0].id])
        return rows;
    }

}
 EscuchoService.getEscucho = async (user) => {
    const client = new Client(config);
    await client.connect();
    const rows = await client.query('SELECT * FROM escucha WHERE usuarioID = $1', [user.id])
    await client.end();
    return rows
  
}

export default EscuchoService