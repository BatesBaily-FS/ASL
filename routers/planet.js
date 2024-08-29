const express = require('express');
const router = express.Router();
const { Planet } = require('../models');
const bodyParser = require('body-parser');
const planetController = require('../controllers/planet');
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', async (req,res) => {
	const planets = await Planet.findAll();
	res.status(200).json(planets);
});

router.post('/', async (req,res) => {
	const { name, size, description } = req.body;
	const planet = await Planet.create( { name, size, description });
	res.status(201).json({ message: 'Planet created' });
});

router.post('/:planetId/stars/:starId', async (req, res, next) => {
	try {
		await planetController.addStarToPlanet(req, res);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res) => {
	const planet = await Planet.findByPk(req.params.id);
		if(!planet) {
		return res.status(404).json({ message: 'Planet not found'});
		}
	res.status(200).json(planet);
	});

router.put('/:id', async (req,res) => {
	const { name, size, description } = req.body;
	const { id } = req.params;
	const updated = await Planet.update(
	{ name, size, description },
	{ where: { id }, returning: true }
	);
	if (updated === 0) {
	return res.status(404).json({ message: 'Planet not found'});
	}
	updatedPlanet = await Planet.findByPk(id);
	res.status(200).json(updatedPlanet);
});

router.delete('/:id', async (req,res) => {
	const { id } = req.params;
	const deleted = await Planet.destroy({
		where: { id }
	})
	if (deleted === 0) {
	return res.status(404).json({ message: 'Planet not found'})
	}
	res.status(204).json({ message: 'Planet deleted' });
});

module.exports = router;
