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
    const rows = await client.query("INSERT INTO canciones VALUES ($1, $2) RETURNING *", [cancion.nombre])
    await client.end()
    return rows; 
  }

  CancionesService.updateCancion = async (cancion) => {
    const client = new Client(config);
    await client.connect();
    const {rows} = await client.query("UPDATE canciones SET nombre = $1 WHERE id = $2 RETURNING *", [cancion.nombre, cancion.id])
    await client.end()
    return rows;
  }

  CancionesService.deleteCancion = async (cancion) => {
    const client = new Client(config);
    await client.connect();
    try{
    await client.query("BEGIN")
    await client.query("DELETE FROM escucha WHERE cancion_id = $1", [cancion.id])
    const {rows} = await client.query("DELETE FROM canciones WHERE id = $1 RETURNING *",[cancion.id]);
  await client.query("COMMIT")
  return rows;}
  catch(error) {
    await client.query("ROLLBACK");
    throw error
  }
   finally {await client.end()}
  }
export default CancionesService