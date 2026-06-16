const Empleado = require('./../../src/models/empleado.model'); // Asegúrate de usar la ruta correcta a tu modelo
const empleadoCtrl = {};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req ,res) =>{
    try{
        const empleados = await Empleado.findAll()
        res.json(empleados)
    }catch (error){
        res.status(500).json({ status: '0', msg: 'Error al obtener los empleados.' });
    }
}


//Obtener un empleado
empleadoCtrl.getEmpleado = async (req,res)=>{
    try{
        const empleado = await Empleado.findByPk(req.params.id)
        if (!empleado) {
            return res.status(404).json({ status: '0', msg: 'Empleado no encontrado.' });
        }
        res.json(empleado);

    }catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener el empleado.' });
    }
}


// Crear un empleado
empleadoCtrl.createEmpleado = async (req, res) =>{
    try{
        await Empleado.create(req.body)
        res.json({ status: '1', msg: 'Empleado guardado.' });
    }catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

module.exports = empleadoCtrl;