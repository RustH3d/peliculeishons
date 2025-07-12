const db= require('../db')

async function addRecipeToGroup (recipeId,groupsId){
    const client= await db.connect()

    try {
        await client.query('BEGIN')
         for (const groupId of groupIds) {
      await client.query(
        'INSERT INTO recipe_groups (recipe_id, group_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [recipeId, groupId])
    }
    await client.query('COMMIT');
    return { success: true }; 
}
    catch (error) {
        await client.query('ROLLBACK');
    throw error;
    }finally{
        client.release()
    }
}

async function removeRecipeFromGroups(recipeId,groupId) {
    const result= await db.query(
    'DELETE FROM recipe_groups WHERE recipe_id = $1 AND group_id = $2',
    [recipeId, groupId]
    )

    return result.rowCount>0
}

async function getRecipesForGroups(groupId) {
    const result= await db.query(
    `SELECT r.* FROM recipes r
     JOIN recipe_groups rg ON r.id = rg.recipe_id
     WHERE rg.group_id = $1
     ORDER BY r.title`,
    [groupId]
    )

    return result.rows
}

async function getGroupsForRecipes(recipeId) {
    const result= await db.query(
    `SELECT g.* FROM groups g
     JOIN recipe_groups rg ON g.id = rg.group_id
     WHERE rg.recipe_id = $1
     ORDER BY g.name`,
    [recipeId]
    )

    return result.rows
}





module.exports={
    addRecipeToGroup,
    removeRecipeFromGroups,
    getGroupsForRecipes,
    getRecipesForGroups
}