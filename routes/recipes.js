/* const express= require('express')
const router=  express.Router()
const recipesController= require('../controllers/recipes')

router.get('/',recipesController.getAllRecipes)
router.get('/user/user:id',recipesController.getRecipesByUser)
router.get('/:id',recipesController.getRecipeById)
router.post('/',recipesController.createRecipe)
router.put('/:id',recipesController.updateRecipe)

router.delete('/:id',recipesController.deleteRecipe)



module.exports= router



 */

const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

// Obtener todas las recetas
router.get('/', recipesController.getAllRecipes);

// Obtener recetas por ID de usuario
router.get('/user/:id', recipesController.getRecipesByUser);

// Obtener una receta específica por ID
router.get('/:id', recipesController.getRecipeById);

// Crear nueva receta
router.post('/', recipesController.createRecipe);

// Actualizar receta existente
router.put('/:id', recipesController.updateRecipe);

// Eliminar receta
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
