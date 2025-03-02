const db = require("../db/queries");

async function getPathPage(req, res) {
    let pathName = req.params.pathName;
    pathName = pathName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    console.log(pathName);

    const characters = await db.getPathCharacters(pathName);
    const paths = await db.getPaths();

    res.render("index", { pathName, characters, paths });
}

module.exports = { getPathPage };
