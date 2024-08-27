'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Planet.belongsToMany(models.Stars, { through: 'StarsPlanets' })
  	}
  }
   Planet.init({
    name: {
	    type: DataTypes.STRING,
	    validate: {
		    notEmpty: true
	    }
    },
    size: {
	    type: DataTypes.INTEGER,
	    validate: {
		    isInt: true
	    }

    },
    description: {
	    type: DataTypes.TEXT,
	    validate: {
		    notEmpty: true
	    }
    }
   }, {
	   sequelize,
	   modelName: 'Planet',
    });
  return Planet;
};
