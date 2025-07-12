const express= require('express')
const router=  express.Router()
const commentsController= require('../controllers/comments')

router.post('/',commentsController.createComment)
router.get('/user/:user_id', commentsController.getCommentsByUser);


router.get('/:movie_id',commentsController.getCommentsByMovie)
router.get('/user/:user_id/movie/:movie_id', commentsController.getCommentByUserAndMovie);
router.get('/',commentsController.getAllComments)
router.get('/comment/:id',commentsController.getComment)
router.delete('/:id',commentsController.deleteComment)
router.put('/:id', commentsController.updateComment)

module.exports=  router
