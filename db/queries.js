const pool = require("./pool");

async function getCharacters() {
    const { rows } = await pool.query(
        `SELECT characters.id, characters.name, characters.element, 
                characters.path_id, characters.image, path.text 
         FROM characters 
         JOIN path ON characters.path_id = path.id`
    );
    return rows;
}

async function getPaths() {
    const { rows } = await pool.query("SELECT text FROM path");
    return rows;
}

async function getElements() {
    const { rows } = await pool.query(
        "SELECT DISTINCT element FROM characters"
    );
    return rows;
}

async function getPathCharacters(pathName) {
    const { rows } = await pool.query(
        `SELECT characters.id, characters.name,
                characters.image, path.text 
         FROM characters 
         JOIN path ON characters.path_id = path.id 
         WHERE path.text = $1`,
        [pathName]
    );
    return rows;
}

async function getCharacterDetails(characterId) {
    const { rows } = await pool.query(
        `SELECT characters.name, characters.element,
                characters.image_full,
                path.text, characters.rarity,
                characters.description,
                characters.id
         FROM characters 
         JOIN path ON characters.path_id = path.id 
         WHERE characters.id = $1`,
        [characterId]
    );
    return rows[0];
}

async function updateCharacter(
    characterId,
    name,
    path,
    element,
    rarity,
    description
) {
    const { rows } = await pool.query(`SELECT id FROM path WHERE text = $1`, [
        path,
    ]);
    const pathId = rows[0].id;

    await pool.query(
        `UPDATE characters 
         SET name = $1, path_id = $2, element = $3, rarity = $4, description = $5 
         WHERE id = $6`,
        [name, pathId, element, rarity, description, characterId]
    );
}

async function deleteCharacter(characterId) {
    await pool.query(`DELETE FROM characters WHERE id = $1`, [characterId]);
}

module.exports = {
    getCharacters,
    getPaths,
    getPathCharacters,
    getCharacterDetails,
    getElements,
    updateCharacter,
    deleteCharacter,
};
