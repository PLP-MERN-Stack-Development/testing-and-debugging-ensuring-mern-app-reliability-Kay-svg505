const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createPost);
router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);
router.put('/:id', auth, controller.updatePost);
router.delete('/:id', auth, controller.deletePost);

module.exports = router;
