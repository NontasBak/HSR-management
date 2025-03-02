const db = require("../db/queries");

async function getCharactersAndPaths(req, res) {
    const characters = await db.getCharacters();

    const paths = await db.getPaths();
    // console.log(paths);

    console.log(characters);

    res.render("index", { characters, paths });
}

module.exports = { getCharactersAndPaths };
