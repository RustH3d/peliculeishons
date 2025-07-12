const db= require('../db')
const bcrypt= require('bcrypt')

const getAllComments= async ()=>{
    const result= await db.query(`
    SELECT * FROM comments ORDER BY created_at DESC
  `)
    return result.rows
}

const getCommentByUserAndMovie = async (user_id, movie_id) => {
  const result = await db.query(
    `SELECT * FROM comments WHERE user_id = $1 AND movie_id = $2 LIMIT 1`,
    [user_id, movie_id]
  );
  return result.rows[0];  
};



const getCommentsByUserWithMovie = async (user_id) => {
  const result = await db.query(`
    SELECT 
      c.id AS comment_id,
      c.puntaje,
      c.comentario,
      c.movie_id,
      m.titulo,
      m.poster_url,
      m.fecha_lanzamiento,
      m.categorias
    FROM comments c
    JOIN movies m ON c.movie_id = m.id
    WHERE c.user_id = $1
    ORDER BY c.created_at DESC
  `, [user_id]);

  return result.rows.map(row => ({
    id: row.comment_id,
    puntaje: row.puntaje,
    comentario: row.comentario,
    movie: {
      id: row.movie_id,
      titulo: row.titulo,
      poster_url: row.poster_url,
      fecha_lanzamiento: row.fecha_lanzamiento,
      categorias: row.categorias,
    }
  }));
};

const createComment = async ({ user_id, movie_id, comentario, puntaje }) => {
  
  const result = await db.query(`
    INSERT INTO comments (user_id, movie_id, comentario, puntaje)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [user_id, movie_id, comentario, puntaje]);
  return result.rows[0];
};





const getCommentsByMovie = async (movie_id) => {
  const result = await db.query(`
    SELECT 
      c.*, 
      u.nombre AS user_name
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.movie_id = $1
    ORDER BY c.created_at DESC
  `, [movie_id]);
  return result.rows;
};


const getAverageRating= async (movie_id)=>{
    const result= await db.query(`SELECT 
      AVG(CASE WHEN u.rol = 'critic' THEN c.puntaje ELSE NULL END) AS critic_rating,
      AVG(CASE WHEN u.rol != 'critic' THEN c.puntaje ELSE NULL END) AS user_rating
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.movie_id = $1`,
    [movie_id])
    return result.rows[0]
}

const deleteComment= async(id,user_id)=>{
    const result= await db.query(
        "DELETE FROM comments WHERE id = $1 AND user_id= $2", [id,user_id]
    )
    return result.rowCount > 0
}

const updateComment = async ({ id, user_id, comentario,puntaje }) => {
   
    const result = await db.query(`
    UPDATE comments
    SET comentario = $1,
        puntaje = $2,
        created_at = CURRENT_TIMESTAMP
    WHERE id = $3 AND user_id = $4
    RETURNING *
  `, [comentario, puntaje, id, user_id]
    );
    return result.rows[0];
  
};


const getCommentById = async (id) => {
  const result = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
  return result.rows[0];
};


module.exports={
    
    createComment,
    getCommentsByMovie,
    updateComment,
    deleteComment,
    getCommentByUserAndMovie,
    getCommentsByUserWithMovie,
    getAverageRating, 
    getCommentById,
    getAllComments

}