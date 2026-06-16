const Publicacion = require ('../models/publicacion.model')
const Empleado = require ('../models/empleado.model')
const publicacionCtrl = {}

const { Op } = require('sequelize');  // Permite la busqueda parcial 

// Obtener publicaciones
publicacionCtrl.getPublicaciones = async (req,res)=>{
    try{
        const data = {}
        const tituloBuscado = req.query.titulo
        const vigenteBuscado = req.query.vigente

        if (tituloBuscado) {
            data.titulo = { [Op.like]: `%${tituloBuscado}%` };
        }

        if (vigenteBuscado === "true") {
            data.vigente = true;
        } else if (vigenteBuscado === "false") {
            data.vigente = false;
        }

        const publicaciones = await Publicacion.findAll({
            where: data, // FILTROS DINAMICOS
            attributes: {
                exclude: ['empleadoId']
            },
            include: [{
                model: Empleado,
                as: 'empleado'
            }]
        });

        res.json(publicaciones)

    }catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las publicaciones.' });
    }
}


// Crear publicacion 
publicacionCtrl.createPublicacion = async (req ,res) =>{
    try{
        const data = req.body
        if (data.empleado && data.empleado.id){
            data.empleadoId = data.empleado.id
        }
        await Publicacion.create(data)
        res.json({ status: '1', msg: 'Publicacion guardado.' });

    }catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}


// Modificar una publicacion
publicacionCtrl.editPublicacion = async (req,res)=>{
    try{
        const data = req.body; 
        const publicacion = await Publicacion.findByPk(req.params.id);
        if (!publicacion) {
            return res.status(404).json({ status: '0', msg: 'La publicación no existe.' });
        }

        if (data.empleado && data.empleado.id) {
            data.empleadoId = data.empleado.id;
        }

        await publicacion.update(data); //atencion
        
        res.json({ status: '1', msg: 'Publicacion updated' });

    }catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
}


// Eliminar una publicacion
publicacionCtrl.deletePublicacion = async (req, res) => {
    try {
    await Publicacion.destroy({
        where: { id: req.params.id }
    });
    res.json({ status: '1', msg: 'Publicacion removed' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};


module.exports = publicacionCtrl;