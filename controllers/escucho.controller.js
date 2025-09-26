import EscuchoService from '../services/escucho.service.js'

const EscuchoController = {}

EscuchoController.grabarEscucha = async (req, res) => {
    const body = req.body
    try{
        const escucha = await EscuchoService.grabarEscucha(req.user, body.cancionID);
        res.json(escucha)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message})
    }
}
EscuchoController.getEscucho = async (req, res) => {
   const userid= req.body.userid;
    if(!userid) return res.status(400).json('no se insertó un userid')
    try {
        const escuchas = await EscuchoService.getEscucho(userid);
        res.json(escuchas)
        console.log(escuchas);
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
};
export default EscuchoController