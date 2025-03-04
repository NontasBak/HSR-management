const db = require("../db/queries");

async function getIndexPage(req, res) {
    const characters = await db.getCharacters();
    const paths = await db.getPaths();
    const pathName = null;
    res.render("index", { characters, paths, pathName });
}

module.exports = { getIndexPage };
