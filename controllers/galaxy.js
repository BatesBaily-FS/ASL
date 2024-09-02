const { Galaxy } = require('../models');

	
	async function index(req, res) {
	try {
	const galaxies = await Galaxy.findAll();
	res.render('galaxies/index.html.twig', { galaxies });
	} catch (error) {
	res.status(500).json({ message: error.message });
	}
}

async function create(req,res) {
	try {
	const {name, size, description} = req.body;
	const newGalaxy = await Galaxy.create({ name, size, description });
	res.status(302).redirect('/galaxies');
	} catch (error) {
	res.status(400).json({ message: error.message});
	}
}

async function show(req,res) {
	try {
	const galaxy = await Galaxy.findByPk(req.params.id);
	if (!galaxy) {
	return res.status(404).json({ message: 'Galaxy not found' });
	}
	res.render('galaxies/show.html.twig', {galaxy });
		} catch (error) {
	res.status(400).json({ message: error.message });
	}
}

async function update(req, res) {
	try {
	const { id } = req.params;
	const { name, size, description } = req.body;
	const updatedGalaxy = await Galaxy.update(
		{ name, size, description },
		{ where: { id }, returning: true }
	);
	if (updatedGalaxy[0] === 0) {
		return res.status(404).json({ message: 'Galaxy not found' });
	}
	res.status(302).redirect(`/galaxies/${req.params.id}`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function remove(req, res) {
	try {
	const { id } = req.params;
	const deleted = await Galaxy.destroy({
		where: { id }
	});
	if (deleted === 0 ) {
	return res.status(404).json({ message: 'Galaxy not found'});
	} 
	res.status(302).redirect('/galaxies');
	} catch (error) {
	res.status(500).json({ message: error.message });
		}
	}

async function form(req, res) {
		const { id } = req.params
	let galaxy = new Galaxy()
	if (typeof id !== "undefined") {
		galaxy = await Galaxy.findByPk(id)
	}
	res.render('galaxies/_form.html.twig', { galaxy, id });
}




module.exports = { index, show, create, update, remove, form };
