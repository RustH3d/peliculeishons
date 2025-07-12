const express= require('express')
const router=  express.Router()
const usersController= require('../controllers/users')


router.get('/',usersController.getAllUsers)
router.post('/login',usersController.loginUser)
router.post('/register',usersController.createUser)
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
router.get('/:id', usersController.getUserById);
router.get("/email/:email", usersController.getUserByEmail);


/* router.post('/login',usersController.login)
router.get('/:id',usersController.getUserById)
router.put('/:id',usersController.updateUser)
router.delete('/:id',usersController.deleteUser) */


module.exports= router