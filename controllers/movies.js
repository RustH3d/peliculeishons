const moviesModel= require('../models/movies')
const axios = require('axios');
require('dotenv').config();

const getAllMovies= async(req,res)=>{
    try {
        const movies= await  moviesModel.getAllMovies()
        res.json(movies)
    } catch (error) {
        console.error("Error al obtener las peliculas:", error);
     res.status(500).json({ message: "Error al obtener las peliculas" });
    }
}


/* const createMovie = async (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  try {
    // Verifica si ya está en la base local
    const existingMovie = await moviesModel.findByTitle(titulo);
    if (existingMovie) {
      return res.status(200).json(existingMovie);
    }

    // Si no existe, buscar en TMDB
    const tmdbRes = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: titulo,
      },
    });

    const movie = tmdbRes.data.results[0];
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada en TMDB' });
    }

    // Insertar en la DB local
    const newMovie = await moviesModel.createMovie({
      titulo: movie.title,
      descripcion: movie.overview,
      fecha_lanzamiento: movie.release_date,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      tmdb_id: movie.id,
      categorias: [], // luego podrías rellenar esto
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error al crear película desde TMDB:', error);
    res.status(500).json({ message: 'Error interno al crear película' });
  }
}; */

const createMovie = async (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  try {
    // Verifica si ya está en la base local
    const existingMovie = await moviesModel.findByTitle(titulo);
    if (existingMovie) {
      return res.status(200).json(existingMovie);
    }

    // Buscar en TMDB
    const tmdbRes = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: titulo,
      },
    });

    const movie = tmdbRes.data.results[0];
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada en TMDB' });
    }

    // Mapeo de géneros por ID
    const genreMap = {
      28: 'Acción',
      12: 'Aventura',
      16: 'Animación',
      35: 'Comedia',
      80: 'Crimen',
      99: 'Documental',
      18: 'Drama',
      10751: 'Familia',
      14: 'Fantasía',
      36: 'Historia',
      27: 'Terror',
      10402: 'Música',
      9648: 'Misterio',
      10749: 'Romance',
      878: 'Ciencia Ficción',
      10770: 'TV',
      53: 'Suspenso',
      10752: 'Bélica',
      37: 'Western'
    };

    const genreNames = (movie.genre_ids || []).map(id => genreMap[id]).filter(Boolean);

    // Insertar en DB local
    const newMovie = await moviesModel.createMovie({
      titulo: movie.title,
      descripcion: movie.overview,
      fecha_lanzamiento: movie.release_date,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      tmdb_id: movie.id,
      categorias: genreNames,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error al crear película desde TMDB:', error);
    res.status(500).json({ message: 'Error interno al crear película' });
  }
};



const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { titulo,descripcion,fecha_lanzamiento,poster_url,tmdb_id,categorias } = req.body;

  try {
    const updatedMovie = await moviesModel.updateMovie({ id, titulo,descripcion,fecha_lanzamiento,poster_url,tmdb_id,categorias });
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error al actualizar peliucla:", error);
    res.status(500).json({ message: "Error al actualizar pelicula" });
  }
};



const deleteMovie= async(req,res)=>{
  const { id } = req.params;
   try {
  const deleted = await moviesModel.deleteMovie({ id });
  if (!deleted) {
    return res.status(404).json({ message: 'Película no encontrada' });
  }
  res.status(204).send();
} catch (error) {
  console.error("Error al eliminar película:", error);
  res.status(500).json({ message: "Error al eliminar película" });
}
}

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await moviesModel.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    console.error("Error al obtener pelicula por id:", error);
    res.status(500).json({ message: "Error al obtener pelicula" });
  }
};

const searchMovies = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Falta el parámetro de búsqueda' });
  }

  try {
    const localMatches = await moviesModel.searchMoviesByTitle(query);

    if (localMatches.length > 0) {
      return res.json(localMatches);
    }

    // Si no hay coincidencias, buscar en TMDB
    const tmdbRes = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
      },
    });

    const tmdbMovies = tmdbRes.data.results.slice(0, 5); // limitar si quieres

    const savedMovies = [];

   /*  for (const movie of tmdbMovies) {
      // Verifica que no esté duplicada (por ID de TMDB)
      const alreadyExists = await moviesModel.findByTitle(movie.title);
      if (!alreadyExists) {
        const newMovie = await moviesModel.createMovie({
          titulo: movie.title,
          descripcion: movie.overview,
          fecha_lanzamiento: movie.release_date,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          tmdb_id: movie.id,
          categorias: [],
        });
        savedMovies.push(newMovie);
      }
    } */
   const genreMap = {
  28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia',
  80: 'Crimen', 99: 'Documental', 18: 'Drama', 10751: 'Familia',
  14: 'Fantasía', 36: 'Historia', 27: 'Terror', 10402: 'Música',
  9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia Ficción',
  10770: 'TV', 53: 'Suspenso', 10752: 'Bélica', 37: 'Western'
};

for (const movie of tmdbMovies) {
  const alreadyExists = await moviesModel.findByTitle(movie.title);
  if (!alreadyExists) {
    const genreNames = (movie.genre_ids || []).map(id => genreMap[id]).filter(Boolean);

    const newMovie = await moviesModel.createMovie({
      titulo: movie.title,
      descripcion: movie.overview,
      fecha_lanzamiento: movie.release_date,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      tmdb_id: movie.id,
      categorias: genreNames, // ✅ ahora sí se guardan los nombres
    });

    savedMovies.push(newMovie);
  }
}


    res.status(201).json(savedMovies);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).json({ message: 'Error al buscar películas' });
  }
};


module.exports={
    createMovie,
    updateMovie,
    deleteMovie,
    getAllMovies,
    searchMovies,
    getMovieById, 
}