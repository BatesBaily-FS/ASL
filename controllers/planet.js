const { Planet, Stars, StarsPlanets } = require('../models');

	
	async function index(req, res) {
	try {
	const planets = await Planet.findAll();
	res.render('planets/index.html.twig', { planets});
	} catch (error) {
	res.status(500).json({ message: error.message });
	}
}

async function create(req,res) {
	try {
	const {name, size, description} = req.body;
	const newPlanet = await Planet.create({ name, size, description });
	res.status(302).redirect('/planets/');
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
	res.render('planets/show.html.twig', { planet });
	} catch (error) {
	res.status(400).json({ message: error.message });
	}
}

async function update(req, res) {
	try {
	const { id } = req.params;
	const { name, size, description } = req.body;
	const updatedPlanet = await Planet.update(
		{ name, size, description },
		{ where: { id }, returning: true }
	);
	if (updatedPlanet[0] === 0) {
		return res.status(404).json({ message: 'Planet not found' });
	}
	res.status(302).redirect(`/planets/${req.params.id}`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function remove(req, res) {
	try {
	const { id } = req.params;
	const deleted = await Planet.destroy({
		where: { id }
	});
	if (deleted === 0 ) {
	return res.status(404).json({ message: 'Planet not found'});
	} 
	res.status(302).redirect('/planets');
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

async function form(req, res) {
	const { id } = req.params
	let planet = new Planet ()
	if (typeof id !== "undefined") {
		planet = await Planet.findByPk(id)
	}
	res.render('planets/_form.html.twig', { planet, id });
		}

module.exports = { index, show, create, remove, update, addStarToPlanet, form };
