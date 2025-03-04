const db = require("../db/queries");

async function getCharacterInfo(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    console.log(characterDetails);
    res.render("characterInfoPage", { characterDetails });
}

async function getEditForm(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    res.render("characterEditPage", { characterDetails });
}

async function updateCharacter(req, res) {}

async function getDeleteForm(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    res.render("characterDeletePage", { characterDetails });
}

async function deleteCharacter(req, res) {}

module.exports = {
    getCharacterInfo,
    getEditForm,
    updateCharacter,
    getDeleteForm,
    deleteCharacter,
};
