const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database'); // Asegúrate de que la ruta apunte a tu archivo
const Empleado = require('./empleado.model')

const Publicacion = sequelize.define('Publicacion', {
    // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
    titulo: {type: DataTypes.STRING, allowNull: false},
    contenido: {type: DataTypes.STRING, allowNull: false},
    imagenAsociada: {type: DataTypes.STRING, allowNull: false},
    fechaPublicacion: {type: DataTypes.STRING, allowNull: false},
    vigente: {type: DataTypes.BOOLEAN, allowNull: false},
}, {
    tableName: 'publicaciones', // Nombre de la tabla en minúsculas y plural
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});

Publicacion.belongsTo(Empleado,{as:'empleado'})

module.exports = Publicacion;