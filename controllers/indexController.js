const db = require("../db/queries");

async function getPaths(req, res) {
    return await db.getPaths();
}

async function getCharacters(req, res) {
    return await db.getCharacters();
}

async function getIndexPage(req, res) {
    const characters = await db.getCharacters();
    const paths = await db.getPaths();
    const pathName = null;
    res.render("index", { characters, paths, pathName });
}

module.exports = { getIndexPage };
