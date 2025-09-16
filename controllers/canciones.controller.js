import CancionesService from '../services/canciones.service.js '

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

export default CancionesController