const db = require('../db');
const { fetchMovieFromTMDb } = require('./tmdb')

const inserOrFetchMovieFromTMDd= async(tmdbId)=>{
    const existing= await db.query('SELECT * FROM movies WHERE tmdb_id = $1',[tmdbId])
    if(existing.rows.length){
         return existing.rows[0]; // Ya está en la DB
    }
    const movie= await fetchMovieFromTMDb(tmdbId)

    const result= await db.query(`INSERT INTO movies (titulo, descripcion, fecha_lanzamiento, poster_url, tmdb_id, categorias)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,[
        movie.title,
        movie.overview,
        movie.release_date,
        '`https://image.tmdb.org/t/p/w500${movie.poster_path}',
        movie.id,
        movie.genres.map(g=>g.name)
     ])

     return result.rows[0]
}


module.exports={
    inserOrFetchMovieFromTMDd
}