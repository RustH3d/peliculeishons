const db = require('../db');


const getAllGroups= async ()=>{
    const result= await db.query(`SELECT * FROM "groups" ORDER BY name ASC`)
    return result.rows
}

const createGroup = async ({ name, user_id }) => {
  const query = `
    INSERT INTO "groups" (name, user_id)
    VALUES ($1, $2)
    RETURNING *`;
  const values = [name, user_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};




const getGroupByUser= async(userId)=>{
   const query = `
    SELECT * FROM "groups"
    WHERE user_id = $1
    ORDER BY name ASC;
  `;
  const values = [userId];
  // const { rows } = await pool.query(query, values);
  const { rows } = await db.query(query, values);

  return rows;
}

const getGroupById = async (id) => {
  const query = 'SELECT * FROM groups WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};


const deleteGroup= async(id)=>{
    const query = 'DELETE FROM groups WHERE id = $1 RETURNING *';
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

const addRecipesToGroup = async (groupId, recipeIds) => {
  const insertQuery = `
    INSERT INTO recipe_groups (recipe_id, group_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;

  for (const recipeId of recipeIds) {
    await db.query(insertQuery, [recipeId, groupId]);
  }

  return { message: 'Recetas agregadas con éxito al grupo.' };
};


const updateGroup= async(id,name)=>{
   console.log(`Query: UPDATE "groups" SET name = $1 WHERE id = $2`);
  console.log('Valores:', name, id);

  const result = await db.query(
    `UPDATE "groups" SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id]
  );

  console.log('Resultado de query:', result.rows[0]);
  return result.rows[0];

}

/* const getRecipesByGroupId = async (groupId) => {
  const query = `
    SELECT r.*
    FROM recipe_groups rg
    JOIN recipes r ON rg.recipe_id = r.id
    WHERE rg.group_id = $1
    ORDER BY r.title ASC
  `;
  const { rows } = await db.query(query, [groupId]);
  return rows;
}; */

const getRecipesByGroupId = async (groupId) => {
  const query = `
    SELECT r.*
    FROM recipe_groups rg
    JOIN recipes r ON rg.recipe_id = r.id
    WHERE rg.group_id = $1
    ORDER BY r.title ASC;
  `;
  const { rows } = await db.query(query, [groupId]);
  return rows;
};



const removeRecipeFromGroup = async (groupId, recipeId) => {
  const query = `
    DELETE FROM recipe_groups
    WHERE group_id = $1 AND recipe_id = $2
  `;
  await db.query(query, [groupId, recipeId]);
};


module.exports={
    createGroup,
    getAllGroups,
    getGroupById,
    getGroupByUser,
    updateGroup,
    getRecipesByGroupId,
    deleteGroup,
    removeRecipeFromGroup,
    addRecipesToGroup
}
