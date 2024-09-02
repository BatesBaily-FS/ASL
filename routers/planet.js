const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const planetCtrl = require('../controllers/planet');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', planetCtrl.index);
router.post('/', planetCtrl.create);
router.get('/new', planetCtrl.form);
router.get('/:id/edit', planetCtrl.form);
router.get('/:id', planetCtrl.show);
router.put('/:id', planetCtrl.update);
router.post('/:id', planetCtrl.update);
router.delete('/:id', planetCtrl.remove);
router.get('/:id/delete', planetCtrl.remove);
router.post('/:planetId/stars/:starsId', planetCtrl.addStarToPlanet);


module.exports = router;
