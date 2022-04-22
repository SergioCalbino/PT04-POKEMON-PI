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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

    weight: { 
    type: DataTypes.FLOAT,
    allowNull: true
    },
    
    img: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });
};
