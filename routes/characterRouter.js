const { Router } = require("express");
const {
    getCharacterInfo,
    getEditForm,
    updateCharacter,
    getDeleteForm,
    deleteCharacter,
} = require("../controllers/characterController");

const characterRouter = Router();

characterRouter.get("/:characterId", getCharacterInfo);

characterRouter.get("/:characterId/edit", getEditForm);
characterRouter.post("/:characterId/edit", updateCharacter);

characterRouter.get("/:characterId/delete", getDeleteForm);
characterRouter.delete("/:characterId", deleteCharacter);

module.exports = characterRouter;
