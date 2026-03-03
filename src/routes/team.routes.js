
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const upload = require('../utils/upload'); // your existing multer config
const ctrl = require('../controllers/team.controller');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// protected
router.post('/', auth, upload.single('photo'), ctrl.create);
router.put('/:id', auth, upload.single('photo'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;