const express = require('express');
const router = express.Router();
const { Galaxy } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', async (req,res) => {
	const galaxies = await Galaxy.findAll();
	res.status(200).json(galaxies);
});

router.post('/', async (req,res) => {
	const { name, size, description } = req.body;
	const galaxy = await Galaxy.create( { name, size, description });
	res.redirect('/galaxies', 201);
});

router.get('/:id', async (req, res) => {
	const galaxy = await Galaxy.findByPk(req.params.id);
		if(!galaxy) {
		return res.status(404).json({ message: 'Galaxy not found'});
		}
	res.status(200).json(galaxy);
	});

router.put('/:id', async (req,res) => {
	const { name, size, description } = req.body;
	const { id } = req.params;
	const updated = await Galaxy.update(
	{ name, size, description },
	{ where: { id }, returning: true }
	);
	if (updated === 0) {
	return res.status(404).json({ message: 'Galaxy not found'});
	}
	updatedGalaxy = await Galaxy.findByPk(id);
	res.status(200).json(updatedGalaxy);
});

router.delete('/:id', async (req,res) => {
	const { id } = req.params;
	const deleted = await Galaxy.destroy({
		where: { id }
	})
	if (deleted === 0) {
	return res.status(404).json({ message: 'Galaxy not found'})
	}
	res.redirect('/galaxies', 204);
});

module.exports = router;

