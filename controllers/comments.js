const commentsModel= require('../models/comments')

const getAllComments= async(req,res)=>{
    try {
        const comments= await  commentsModel.getAllComments()
        res.json(comments)
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
     res.status(500).json({ message: "Error al obtener los comentarios" });
    }
}

const getCommentByUserAndMovie = async (req, res) => {
  const { user_id, movie_id } = req.params;

  if (!user_id || !movie_id) {
    return res.status(400).json({ message: 'Faltan parámetros' });
  }

  try {
    const comment = await commentsModel.getCommentByUserAndMovie(user_id, movie_id);
    if (!comment) return res.status(404).json({ message: 'No hay comentario previo' });
    res.json(comment);
  } catch (error) {
    console.error("Error al buscar comentario por usuario y película:", error);
    res.status(500).json({ message: "Error interno" });
  }
};



const getCommentsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const comments = await commentsModel.getCommentsByUserWithMovie(user_id);
    res.json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios del usuario:", error);
    res.status(500).json({ message: "Error al obtener comentarios del usuario" });
  }
};


const createComment= async(req,res)=>{
    const   {movie_id, puntaje, comentario}= req.body
    const user_id= req.body.user_id||req.user?.id

    if(!movie_id||!puntaje|| !comentario||!user_id){
        return res.status(400).json({message:`faltan datos`})
    }

    try{
        const newComment= await commentsModel.createComment({user_id, movie_id, puntaje, comentario})
        res.status(201).json(newComment)
    }catch(error){
    console.error("Error al crear comentario:", error);
    res.status(500).json({ message: "Error al crear comentario" });
    }
}

const updateComment= async(req,res)=>{
    const { id } = req.params;
    const { puntaje, comentario } = req.body;
    const user_id = req.body.user_id || req.user?.id;

    if (!id || !puntaje || !comentario || !user_id) {
        return res.status(400).json({ message: `Faltan datos` });
    }

    try {
        const updatedComment = await commentsModel.updateComment({ id, user_id, comentario, puntaje });
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Error al actualizar comentario:", error);
        res.status(500).json({ message: "Error al actualizar comentario" });
    }
}

const getCommentsByMovie= async (req,res)=>{
    const   {movie_id}= req.params

    try{
        const comments= await commentsModel.getCommentsByMovie(movie_id)
        const ratings= await commentsModel.getAverageRating(movie_id)
        res.json({comments,ratings})
        
    }catch(error){
    console.error("Error al cargar los comentarios:", error);
    res.status(500).json({ message: "Error al cargar los comentarios" });
    }

}

const deleteComment= async(req,res)=>{
     const   {id}= req.params
     const user_id= req.body.user_id || req.user?.id

     try {
        const succes= await commentsModel.deleteComment(id,user_id)
        if(!succes){
            return res.status(403).json({ message: 'No autorizado' })
        }
     } catch (error) {
        console.error("Error al eliminar comentario:", error);
    res.status(500).json({ message: "Error al eliminar comentario" });
     }

}

const listComments= async(req,res)=>{
     const   {movie_id}= req.params
     if(!movie_id) return res.status(400).json({ message: 'Falta el ID de la película' })

     try {
        const comments = await commentsModel.getCommentsByMovie({movie_id})
        res.json(comments)
     } catch (error) {
        console.error("Error al cargar los comentarios:", error);
    res.status(500).json({ message: "Error al cargar los comentarios" });
     }

}

const getComment= async(req,res)=>{
     const   {id}= req.params
     

     try {
        const comment = await commentsModel.getCommentById({id})
        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' })
        res.json(comments)
     } catch (error) {
        console.error("Error al cargar los comentarios:", error);
    res.status(500).json({ message: "Error al cargar los comentarios" });
     }

}

module.exports={
    createComment,
    deleteComment,
    getCommentsByMovie,
     getCommentsByUser,
     getCommentByUserAndMovie,
    listComments,
    updateComment,
    getComment,
    getAllComments
}