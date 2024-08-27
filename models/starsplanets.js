'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

class StarsPlanets extends Model {
	static associate(models) {
	}
}
	
	StarsPlanets.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		starId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
			model: 'stars',
			key: 'id'
			}
		},
		planetId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'planets',
				key: 'id'
				}
			}
		}, {
			sequelize,
			modelName: 'starsPlanets',
		});
	return StarsPlanets;
};
