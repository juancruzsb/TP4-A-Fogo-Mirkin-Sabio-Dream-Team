import CancionesService from '../services/canciones.service.js'

const CancionesController = {}

 CancionesController.getCanciones = async (req, res) => {
    try {
       const canciones = await CancionesService.getCanciones();
       res.json(canciones)
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: e.message})
    }
}

CancionesController.createCancion = async (req, res) => {
    const cancion = req.body
    try {
        const canciones = await CancionesService.createCancion(cancion);
        res.json(canciones)
    }
    catch(e) {
        console.error(e);
        res.status(500).json({message: e.message})
    }
    }

CancionesController.updateCancion = async (req, res) => {
const cancion = req.body
if(!cancion.id || !cancion.nombre) return res.status(400).json({message: 'se deben completar todos los campos'})
    try {
    const result = await CancionesService.updateCancion(cancion)
    res.json(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }

}
CancionesController.deleteCancion = async (req, res) => {
    const cancion = req.body;
    if(!cancion.id) return res.status(400).json({message: 'se deben completar todos los campos'})

    try {
        const result = await CancionesService.deleteCancion(cancion)
        res.json(result)
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}
export default CancionesController