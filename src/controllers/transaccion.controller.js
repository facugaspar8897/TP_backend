const Transaccion = require('../models/transaccion.model');
const transaccionCtrl = {};

// Obtener todas las transacciones  
transaccionCtrl.getTransacciones = async (req, res) => {
    try {
        const criteria = {}

        //traer transacciones por email  
        // req.query (clave,valor)
        const emailBuscado = req.query.emailCliente   
        if (emailBuscado){
            criteria.where = {emailCliente:emailBuscado}
        }

        const transacciones = await Transaccion.findAll(criteria);
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Obtener transacciones por idioma 
transaccionCtrl.getTransaccionesPorIdioma = async (req , res) =>{
    try{
        const origen = req.params.origen
        const destino = req.params.destino
        const criteria = {}

        if (origen && destino){
            criteria.where = { idiomaOrigen:origen , idiomaDestino : destino}
        }

        const transacciones = await Transaccion.findAll(criteria)
        res.json(transacciones)
    } catch {
        res.status(500).json({ message: error.message });
    }
}


// Crear transaccion
transaccionCtrl.createTransaccion = async (req ,res) => {
    try{
        await Transaccion.create(req.body)
        res.json({ status: '1', msg: 'Transaccion guardada.' })
    } catch (error){
        res.status(400).json({status: '0', msg: 'Error procesando operacion.'})
    }
}

module.exports = transaccionCtrl;