import pkg from 'pg'
const {Client} = pkg;
import {config} from '../dbconfig.js'

const authService = {}

 authService.login = async (user) => {
    const client = new Client(config);
    await client.connect();
    let result = await client.query("SELECT * FROM usuario WHERE id = $1", 
    [user.userid]);
    await client.end()
    return result;
  }
  
export default authService