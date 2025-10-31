import express from "express";
import 'dotenv/config';
import cors from 'cors'
import cancionesRouter from './routes/canciones.router.js'
import authRouter from './routes/auth.router.js';
import escuchoRouter from './routes/escucho.router.js'
import { sequelize } from "./dbconfig.js";
import { Canciones } from "./models/canciones.models.js";
import { Usuario } from "./models/usuario.models.js";
import { Escucha } from "./models/escucha.models.js";

Canciones.belongsToMany(Usuario, {through: Escucha});
Usuario.belongsToMany(Canciones, {through: Escucha});
await sequelize.sync();


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