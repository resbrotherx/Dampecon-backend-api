const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../utils/upload');

const ctrl = require('../controllers/comments.controller');

// Public - show approved comments only
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Public create (if users submit testimonial)
router.post('/', upload.single('profileImage'), ctrl.create);

// Admin only
router.put('/:id', auth, upload.single('profileImage'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;