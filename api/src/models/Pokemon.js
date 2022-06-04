const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
  
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    life: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    strength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight: { 
    type: DataTypes.INTEGER,
    allowNull: false
    },
    
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  });
};

//Quiero subir esto ultimo a heroku