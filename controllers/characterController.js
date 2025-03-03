const db = require("../db/queries");

async function getCharacterInfo(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    console.log(characterDetails);
    res.render("characterDetails", { characterDetails });
}

module.exports = { getCharacterInfo };
