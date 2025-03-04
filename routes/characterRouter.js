const express = require("express");

const {
    getCharacterInfo,
    getEditForm,
    characterValidators,
    updateCharacter,
    getDeleteForm,
    deleteCharacter,
} = require("../controllers/characterController");

const characterRouter = express.Router();
characterRouter.use(express.urlencoded({ extended: true }));

characterRouter.get("/:characterId", getCharacterInfo);

characterRouter.get("/:characterId/edit", getEditForm);
characterRouter.post("/:characterId/edit", characterValidators, updateCharacter);

characterRouter.get("/:characterId/delete", getDeleteForm);
characterRouter.delete("/:characterId", deleteCharacter);

module.exports = characterRouter;
