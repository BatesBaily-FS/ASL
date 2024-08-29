const express = require('express');
const router = express.Router();
const { Star } = require('../models');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', async (req,res) => {
	const stars = await Star.findAll();
	res.status(200).json(stars);
});

router.post('/', async (req,res) => {
	const { name, size, description } = req.body;
	const star = await Star.create( { name, size, description });
	res.redirect('/stars', 201);
});

router.get('/:id', async (req, res) => {
	const star = await Star.findByPk(req.params.id);
		if(!star) {
		return res.status(404).json({ message: 'Star not found'});
		}
	res.status(200).json(star);
	});

router.put('/:id', async (req,res) => {
	const { name, size, description } = req.body;
	const { id } = req.params;
	const updated = await Star.update(
	{ name, size, description },
	{ where: { id }, returning: true }
	);
	if (updated === 0) {
	return res.status(404).json({ message: 'Star not found'});
	}
	updatedStar = await Star.findByPk(id);
	res.status(200).json(updatedStar);
});

router.delete('/:id', async (req,res) => {
	const { id } = req.params;
	const deleted = await Star.destroy({
		where: { id }
	})
	if (deleted === 0) {
	return res.status(404).json({ message: 'Star not found'})
	}
	res.redirect('/stars', 204);

});
module.exports = router
