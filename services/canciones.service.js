import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'

const CancionesService = {}


 CancionesService.getCanciones = async () => {
    const client = new Client(config);
    await client.connect();
    const {rows} = await client.query("select * from canciones");
    await client.end()
    return rows;
  }
  CancionesService.createCancion = async (cancion) => {
    const client = new Client(config);
    await client.connect();
    const rows = await client.query("INSERT INTO canciones VALUES ($1, $2)", [cancion.nombre])
    await client.end()
    return rows;
    
  }

export default CancionesService