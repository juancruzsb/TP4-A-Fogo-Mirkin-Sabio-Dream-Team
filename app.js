import {config} from './dbconfig.js'
import express from "express";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import pkg from 'pg'
const {Client} = pkg;

const app = express()
app.use(express.json());

const PORT = 8000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.get('/canciones', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query("select * from public.canciones");
  await client.end();
  console.log(result.rows);
  res.send(result.rows)

})

app.post('/crearusuario', async (req, res) => {
  const user = req.body;
  console.log(user);

  if (!user.nombre || !user.password || !user.userid) {
    return res.status(400).json({ mesagge: "Debe completar todos los campos" })
  }

  try {
    const client = new Client(config);
    await client.connect();
    console.log("conectado bro");

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    let result = await client.query("INSERT INTO usuario VALUES ($1, $2, $3) RETURNING *", 
      [user.userid, user.password, user.nombre]);

    await client.end();
    
    console.log("Rows creadas: ", result.rowCount);
    res.send(result.rows);

  } catch (err) {
    return res.status(500).json({ mesagge: err.mesagge });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})