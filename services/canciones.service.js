import {config} from '../dbconfig.js'
import { sequelize } from '../dbconfig.js';
import { Canciones } from '../models/canciones.models.js';
import { Escucha } from '../models/escucha.models.js';

const CancionesService = {}


 CancionesService.getCanciones = async () => {
    const canciones = await Canciones.findAll();
    console.log(canciones)
    return canciones;
  }

  CancionesService.createCancion = async (cancion) => {
    const newCancion = await Canciones.create({nombre: cancion.nombre})

    return newCancion; 
  }

  CancionesService.updateCancion = async (cancion) => {
    const cancionModificada = await Canciones.update(
      {
        'nombre': cancion.nombre
      },
      {
        where: {'id': cancion.id},
        returning: true,
      },
    );

    console.log(cancionModificada);
    return cancionModificada;
  }

  CancionesService.deleteCancion = async (cancion) => {
    const t = await sequelize.transaction();

    try {
      await Escucha.destroy(
        { where: {'cancionID': cancion.id} },
        { transaction: t }
      );

      const cancionEliminar = await Canciones.findByPk(cancion.id);

      await cancionEliminar.destroy({ transaction: t });

      await t.commit();
      return cancionEliminar;
    } catch(error) {
      await t.rollback();
      throw error
    }
  }
export default CancionesService