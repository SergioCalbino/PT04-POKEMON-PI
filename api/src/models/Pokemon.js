const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      
    },

    life: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    strength: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    defense: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    speed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    Weight: { 
    type: DataTypes.FLOAT,
    allowNull: true
    },

  });
};
