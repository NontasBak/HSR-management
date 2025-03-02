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
        `SELECT characters.id, characters.name, characters.element, 
                characters.path_id, characters.image, path.text 
         FROM characters 
         JOIN path ON characters.path_id = path.id 
         WHERE path.text = $1`,
        [pathName]
    );
    return rows;
}

module.exports = { getCharacters, getPaths, getPathCharacters };
