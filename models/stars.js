'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Stars.belongsToMany(models.Planet, { through: 'StarsPlanets' })
    }
  }

  Stars.init({
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
	  modelName: 'Stars',
    });
  return Stars;
};
