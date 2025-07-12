const axios= require('axios')

require('dotenv').config()

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const fetchMovieFromTMDB= async (tmdb)=>{
    const url=   `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=es-ES`
    const response= await axios.get(url)
    return response.data
}

module.exports={
    fetchMovieFromTMDB
}