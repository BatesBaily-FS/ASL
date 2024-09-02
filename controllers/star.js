const { Planet, Star } = require('../models/index.js');

	
	async function index(req, res) {
	try {
	const stars = await Star.findAll();
	res.render('stars/index.html.twig', { stars })
	} catch (error) {
	res.status(500).json({ message: error.message });
	}
}

async function create(req,res) {
	try {
	const {name, size, description} = req.body;
	const newStar = await Star.create({ name, size, description });
	res.status(302).redirect('/stars');
	} catch (error) {
	res.status(400).json({ message: error.message});
	}
}

async function show(req,res) {
	try {
	const star = await Star.findByPk(req.params.id);
	if (!star) {
	return res.status(404).json({ message: 'Star not found' });
	}
	res.render('stars/show.html.twig', { star })
	} catch (error) {
	res.status(400).json({ message: error.message });
	}
}

async function update(req, res) {
	try {
	const { id } = req.params;
	const { name, size, description } = req.body;
	const updatedStar = await Star.update(
		{ name, size, description },
		{ where: { id }, returning: true }
	);
	if (updatedStar[0] === 0) {
		return res.status(404).json({ message: 'Star not found' });
	}
	res.status(302).redirect(`/stars/${req.params.id}`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function remove(req, res) {
	try {
	const { id } = req.params;
	const deleted = await Star.destroy({
		where: { id }
	});
	if (deleted === 0 ) {
	return res.status(404).json({ message: 'Star not found'});
	} 
	res.status(302).redirect('/stars');
	} catch (error) {
	res.status(500).json({ message: error.message });
		}
	}

async function form(req, res) {
	const { id } = req.params
	let star = new Star()
	if (typeof id !== "undefined") {
		star = await Star.findByPk(id)
	}
	res.render('stars/_form.html.twig', { star, id });
}

module.exports = { index, show, create, remove, update, form };
