const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = require('../utils/upload');

const ctrl = require('../controllers/projects.controller');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', auth, upload.single('coverImage'), ctrl.create);
router.put('/:id', auth, upload.single('cover'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
