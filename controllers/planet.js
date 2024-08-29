const { Planet, Stars, StarsPlanets } = require('../models');

	
	async function index(req, res) {
	try {
	const planets = await Planet.findAll();
	res.status(200).json(planets);
	} catch (error) {
	res.status(500).json({ message: error.message });
	}
}

async function create(req,res) {
	try {
	console.log('req.body:', req.body);
	const {name, size, description} = req.body;
	const newPlanet = await Planet.create({ name, size, description });
	console.log('Created planet:', newPlanet.toJSON());
	res.status(201).json(newPlanet);
	} catch (error) {
	res.status(400).json({ message: error.message});
	}
}

async function show(req,res) {
	try {
	const planet = await Planet.findByPk(req.params.id);
	if (!planet) {
	return res.status(404).json({ message: 'Planet not found' });
	}
	const updatedPlanet = await Planet.findByPk(id);
	res.status(200).json(updatedPlanet);
	} catch (error) {
	res.status(400).json({ message: error.message });
	}
}

async function destroy(req, res) {
	try {
	const { id } = req.params;
	const deleted = await Planet.destroy({
		where: { id }
	});
	if (deleted === 0 ) {
	return res.status(404).json({ message: 'Planet not found'});
	} 
	res.redirect('/planets', 204);
	} catch (error) {
	res.status(500).json({ message: error.message });
		}
	}
async function addStarToPlanet(req, res) {
	try {
		const {planetId, starId } = req.params;
		const planet = await Planet.findByPk(planetId);
		const star = await Stars.findByPk(starId);

		if (!planet || !star) {
			return res.status(404).json({ message: 'Space object not found' });
		}
		await planet.addStar(star);
		res.status(201).json({ message: 'Star added to planet' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

module.exports = { index, show, create, destroy, addStarToPlanet };
