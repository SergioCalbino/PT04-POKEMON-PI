const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('type', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    })
}
