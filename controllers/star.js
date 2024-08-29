const { Galaxy } = require('../models');

module.exports = {
	
	async index(req, res) {
	try {
	const stars = await Star.findAll();
	res.status(200).json(stars);
	} catch (error) {
	res.status(500).json({ message: error.message });
	}
},

async create(req,res) {
	try {
	const {name, size, description} = req.body;
	const star = await Star.create({ name, size, description });
	res.redirect('/stars', 201);
	} catch (error) {
	res.status(400).json({ message: error.message});
	}
},

async show(req,res) {
	try {
	const star = await Star.findByPk(req.params.id);
	if (!star) {
	return res.status(404).json({ message: Star not found });
	}
	const updatedStar = await Star.findByPk(id);
	res.status(200).json(updatedStar);
	} catch (error) {
	res.status(400).json({ message: error.message });
	}
},

async destroy(req, res) {
	try {
	const { id } = req.params;
	const deleted = await Star.destroy({
		where: { id }
	});
	if (deleted === 0 ) {
	return res.status(404).json({ message: 'Star not found'});
	} 
	res.redirect('/stars', 204);
	} catch (error) {
	res.status(500).json({ message: error.message });
		}
	}
};
modules.exports = { index, show, create, update, remove }
