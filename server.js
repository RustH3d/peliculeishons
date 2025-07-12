const express= require('express')
const app= express()
const cors= require('cors')
require('dotenv').config();
const usersRoutes= require('./routes/users')
const recipesRoutes= require('./routes/recipes')
const groupsRoutes= require('./routes/groups')
const moviesRoutes= require('./routes/movies')
const commentsRoutes= require('./routes/comments')
const PORT= process.env.PORT || 3000
const {Pool}= require('pg')
const pg = require('pg');

app.use(cors())
app.use(express.json())

app.use('/users',usersRoutes)
/* app.use('/recipes',recipesRoutes)
app.use('/groups',groupsRoutes) */
app.use('/movies',moviesRoutes)
app.use('/comments',commentsRoutes)

app.get('/',(req,res)=>{
    res.send('Backend funcionando')
})



 const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "peliculas",
  password: "L1nk3d",
  port: 5432,
}); 



 app.listen(PORT,()=>{
    console.log(`Corriendo en el puerto http://localhost:${PORT}`)
}) 