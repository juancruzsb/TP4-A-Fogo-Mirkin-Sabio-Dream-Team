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

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})