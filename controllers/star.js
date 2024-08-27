const { Galaxy } = require('../models');

module.exports = {
	
	async index(req, res) {
	try {
	const galaxies = await Galaxy.findAll();
	res.status(200).json(galaxies);
	} catch (error) {
	res.status(500).json({ message: error.message });
	}
},

async create(req,res) {
	try {
	const {name, size, description} = req.body;
	const galaxy = await Galaxy.create({ name, size, description });
	res.redirect('/galaxies', 201);
	} catch (error) {
	res.status(400).json({ message: error.message});
	}
},

async show(req,res) {
	try {
	const galaxy = await Galaxy.findByPk(req.params.id);
	if (!galaxy) {
	return res.status(404).json({ message: Galaxy not found });
	}
	const updatedGalaxy = await Galaxy.findByPk(id);
	res.status(200).json(updatedGalaxy);
	} catch (error) {
	res.status(400).json({ message: error.message });
	}
},

async destroy(req, res) {
	try {
	const { id } = req.params;
	const deleted = await Galaxy.destroy({
		where: { id }
	});
	if (deleted === 0 ) {
	return res.status(404).json({ message: 'Galaxy not found'});
	} 
	res.redirect('/galaxies', 204);
	} catch (error) {
	res.status(500).json({ message: error.message });
		}
	}
};
modules.exports = { index, show, create, update, remove }
