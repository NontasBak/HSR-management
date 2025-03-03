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
    const id = parseInt(characterId);
    console.log("logging:", id);
    const { rows } = await pool.query(
        `SELECT characters.name, characters.element,
                characters.image_full,
                path.text, characters.rarity,
                characters.description
         FROM characters 
         JOIN path ON characters.path_id = path.id 
         WHERE characters.id = $1`,
        [id]
    );
    return rows[0];
}

module.exports = { getCharacters, getPaths, getPathCharacters, getCharacterDetails };
