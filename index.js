import express from "express";
import 'dotenv/config';
import cors from 'cors'
import cancionesRouter from './routes/canciones.router.js'
import authRouter from './routes/auth.router.js';
import escuchoRouter from './routes/escucho.router.js'
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

app.use('/auth', authRouter);

app.use('/escucho', escuchoRouter);

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