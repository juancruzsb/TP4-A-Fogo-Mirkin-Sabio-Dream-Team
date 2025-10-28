import express from "express";
import 'dotenv/config';
import cors from 'cors'
import cancionesRouter from './routes/canciones.router.js'
import authRouter from './routes/auth.router.js';
import escuchoRouter from './routes/escucho.router.js'
import { DataTypes, Model } from "sequelize";
import { sequelize } from "./dbconfig.js";
import CancionesController from "./controllers/canciones.controller.js";
const app = express()
app.use(express.json());
app.use(cors())
const PORT = 8000

Cancion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "cancion",
    tableName: "cancion",
  }
);

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