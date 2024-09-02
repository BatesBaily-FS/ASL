const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const galaxyCtrl = require('../controllers/galaxy');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', galaxyCtrl.index);
router.post('/', galaxyCtrl.create);
router.get('/new', galaxyCtrl.form);
router.get('/:id/edit', galaxyCtrl.form);
router.get('/:id', galaxyCtrl.show);
router.put('/:id', galaxyCtrl.update);
router.post('/:id', galaxyCtrl.update);
router.delete('/:id', galaxyCtrl.remove);
router.get('/:id/delete', galaxyCtrl.remove);


module.exports = router;
