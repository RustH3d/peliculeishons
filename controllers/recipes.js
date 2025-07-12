const recipesModel= require('../models/recipes')


const getAllRecipes= async(req,res)=>{
    try {
        const recipes= await recipesModel.getAllRecipes()
        res.json(recipes)
    } catch (error) {
        console.error("Error al obtener recetas:", error);
     res.status(500).json({ message: "Error al obtener reccetas" });
    }
}




const createRecipe= async(req,res)=>{
    const { title, description, steps, user_id,ingredients } = req.body;

  if (!title || !description || !steps || !user_id||!ingredients) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const newRecipe = await recipesModel.createRecipe({ title, description, steps, user_id,ingredients });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error al crear receta' });
  }
}


const updateRecipe = async (req, res) => {
  const { id } = req.params;
  let { title, description, steps, ingredients } = req.body;

  if (!title || !description || !steps || !ingredients) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Convertir strings CSV a arrays
  steps = steps.split(',').map(s => s.trim());
  ingredients = ingredients.split(',').map(i => i.trim());

  try {
    const updatedRecipe = await recipesModel.updateRecipe({ id, title, description, steps, ingredients });
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error al actualizar receta:", error);
    res.status(500).json({ message: "Error al actualizar receta" });
  }
};



const deleteRecipe= async(req,res)=>{
    const { id } = req.params;
  console.log("ID a eliminar:", id);

  try {
    const deletedRecipe= await recipesModel.deleteRecipe(id) 
    res.status(204).send();
  } catch (error) {
   console.error('Error al eliminar receta:', error);
    res.status(500).json({ message: 'Error al eliminar receta' });
  }

}

const getRecipesByUser = async (req, res) => {
  const  userId  = req.params.id;

  try {
    const recipes = await recipesModel.getRecipesByUser(userId);
    if (!recipes) {
      return res.status(404).json({ message: "Receta no encontrado" });
    }
    res.json(recipes);
  } catch (error) {
    console.error("Error al obtener las recetas del usuario:", error);
    res.status(500).json({ message: "Error las recetas del usuario" });
  }
};



const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await recipesModel.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error al obtener la rectea:", error);
    res.status(500).json({ message: "Error al obtener la receta" });
  }
};

module.exports={
    getAllRecipes,
  getRecipesByUser,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
}