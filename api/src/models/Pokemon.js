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
      primarykey: true,
      allowNull: false,
      
    },

    vida: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    Fuerza: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    defensa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    velocidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    Peso: { 
    type: DataTypes.FLOAT,
    allowNull: false
    },

  });
};
