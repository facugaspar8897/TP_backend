const Socio = require('./../../src/models/socio.model'); // Asegúrate de usar la ruta correcta a tu modelo
const socioCtrl = {};

// Obtener todos los socios
socioCtrl.getSocios = async (req, res) => {
try {
    const criteria= {}
    if (req.query.activo === "true"){   //req.query maneja lo que viene desde la direccion url
        criteria.where= {activo:true}
    }else if (req.query.activo === "false"){
        criteria.where={activo:false}
    }
    const socios = await Socio.findAll(criteria);
    res.json(socios);
} catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener los socios.' });
}
};


// Crear un nuevo socio
socioCtrl.createSocio = async (req, res) => {
try {
    // Sequelize usa .create() para instanciar y guardar en un solo paso
    await Socio.create(req.body);
    res.json({ status: '1', msg: 'Socio guardado.' });
} catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
}
};


// Editar un socio
socioCtrl.editSocio = async (req, res) => {
try {
    await Socio.update(req.body, {
    where: { id: req.body.id }
    });
    res.json({ status: '1', msg: 'Socio updated' });
} catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
}
};


// Eliminar un socio
socioCtrl.deleteSocio = async (req, res) => {
try {
    // .destroy() elimina el registro que coincida con el ID enviado por parámetro
    await Socio.destroy({
    where: { id: req.params.id }
    });
    res.json({ status: '1', msg: 'Socio removed' });
} catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
}
};

module.exports = socioCtrl;