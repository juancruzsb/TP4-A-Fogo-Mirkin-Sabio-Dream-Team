import EscuchoService from '../services/escucho.service.js '

const EscuchoController = {}

EscuchoController.grabarEscucha = async (req, res) => {
    try{
        const escucha = EscuchoService.grabarEscucha(req.user, req.cancionID);
        res.json(escucha)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message})
    }
}

export default EscuchoController