/* const express= require('express')
const router=  express.Router()
const groupsController= require('../controllers/groups')
router.get('/',groupsController.getAllGroups)
// router.get('/user/user:id',groupsController.getGroupsByUser)
router.get('/user/:userId', groupsController.getGroupsByUser);

router.get('/:id',groupsController.getGroupsById)
router.post('/',groupsController.createGroup)
router.put('/:id',groupsController.updateGroup)

router.delete('/:id',groupsController.deleteGroup)





module.exports=router */





const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups');

// Obtener todos los grupos
router.get('/', groupsController.getAllGroups);

// Obtener grupos por usuario
router.get('/user/:userId', groupsController.getGroupByUser);

// Obtener grupo por ID
router.get('/:id', groupsController.getGroupById);

// Crear un nuevo grupo
router.post('/', groupsController.createGroup);

// Actualizar grupo existente
router.put('/:id', groupsController.updateGroup);

// Eliminar grupo
router.delete('/:id', groupsController.deleteGroup);

router.post('/:groupId/recipes', groupsController.addRecipesToGroup);

router.get('/:groupId/recipes', groupsController.getRecipesByGroupId);

router.delete('/:groupId/recipes/:recipeId', groupsController.removeRecipeFromGroup);


module.exports = router;
