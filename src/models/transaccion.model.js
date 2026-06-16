const { DataTypes } = require('sequelize');   
const sequelize = require('./../../config/database'); 

const Transaccion = sequelize.define('Transaccion', {
    // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
    idiomaOrigen: {type: DataTypes.STRING, allowNull: false},
    textoOrigen: {type: DataTypes.INTEGER, allowNull: false},
    idiomaDestino: {type: DataTypes.STRING, allowNull: false},
    textoDestino: {type: DataTypes.INTEGER, allowNull: false},
    emailCliente: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'transacciones', // Nombre de la tabla en minúsculas y plural
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});

module.exports = Transaccion;
