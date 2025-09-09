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
const secretKey = "BEGEBE2009"

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

  if (!user.nombre || !user.password || !user.userid) {
    return res.status(400).json({ mesagge: "Debe completar todos los campos" })
  }

  try {
    const client = new Client(config);
    await client.connect();

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

app.post('/login', async (req, res) => {
  const user = req.body;
  if (!user.password || !user.userid) {
    return res.status(400).json({ mesagge: "Debe completar todos los campos" })
  }

  try {
    const client = new Client(config);
    await client.connect();

    let result = await client.query("SELECT * FROM usuario WHERE id = $1", 
    [user.userid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    let dbUser = result.rows[0];
    const passOK = await bcrypt.compare(user.password, dbUser.password);

    const payload = {
      id: dbUser.id,
      name: dbUser.nombre
    }

    const options = {
      expiresIn: '100h',
      issuer: 'ort'
    }

    const token = jwt.sign(payload, secretKey, options);

    if (passOK)
    {
      res.send({nombre: dbUser.nombre, token: token});
    } else { res.send("Clave invalida") }

  } catch (err) {
    return res.status(500).json( { message: err.message });
  }
});

app.post('/escucho', async (req, res) => {
  let token = req.body.token;
  let payloadOriginal = null;

  try {
    payloadOriginal = await jwt.verify(token, secretKey);

    const client = new Client(config);
    await client.connect();

    let result = await client.query('SELECT * FROM escucha WHERE "usuarioID" = $1', 
    [payloadOriginal.id]
    );

    res.send(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})