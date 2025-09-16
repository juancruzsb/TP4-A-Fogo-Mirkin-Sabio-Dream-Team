import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'

const CancionesService = {}


 CancionesService.getCanciones = async () => {
    const client = new Client(config);
    await client.connect();
    const {rows} = await client.query("select * from canciones");
    return rows;
  }

export default CancionesService