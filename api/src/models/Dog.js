const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    imagen: {
      type: DataTypes.STRING,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    life: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdinDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

  },
    { timestamps: false },
  );
};
