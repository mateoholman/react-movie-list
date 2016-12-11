const express = require('express');
const MoviesController = require('../controllers/MoviesController');

const router = express.Router();

router.get('/', MoviesController.list);

router.get('/:id', MoviesController.show);

router.post('/', MoviesController.create);

router.put('/:id', MoviesController.update);

router.delete('/:id', MoviesController.remove);

module.exports = router;
