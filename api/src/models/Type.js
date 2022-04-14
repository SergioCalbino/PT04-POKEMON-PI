const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('type', {
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },

    },{timestamps: false,})
}
