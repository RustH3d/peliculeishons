const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

// 🔽 Primero las rutas específicas
router.get('/search', moviesController.searchMovies);
router.get('/all', moviesController.getAllMovies);

// 🔽 Luego las rutas dinámicas
router.get('/:id', moviesController.getMovieById);
router.post('/', moviesController.createMovie);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
