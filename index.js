import express from "express";
import 'dotenv/config';
import cors from 'cors'
import cancionesRouter from './routes/canciones.router.js'
import authRouter from './routes/auth.router.js';
const app = express()
app.use(express.json());
app.use(cors())
const PORT = 8000


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.use('/canciones', cancionesRouter);
app.use('/auth', authRouter)


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