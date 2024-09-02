const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const starCtrl = require('../controllers/star');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', starCtrl.index);
router.post('/', starCtrl.create);
router.get('/new', starCtrl.form);
router.get('/:id/edit', starCtrl.form);
router.get('/:id', starCtrl.show);
router.put('/:id', starCtrl.update);
router.post('/:id', starCtrl.update);
router.delete('/:id', starCtrl.remove);
router.get('/:id/delete', starCtrl.remove);


module.exports = router;
