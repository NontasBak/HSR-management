const express = require("express");

const {
    getCharacterInfo,
    getEditForm,
    editCharacterValidators,
    updateCharacter,
    getDeleteForm,
    deleteCharacterValidators,
    deleteCharacter,
} = require("../controllers/characterController");

const characterRouter = express.Router();
characterRouter.use(express.urlencoded({ extended: true }));

characterRouter.get("/:characterId", getCharacterInfo);

characterRouter.get("/:characterId/edit", getEditForm);
characterRouter.post(
    "/:characterId/edit",
    editCharacterValidators,
    updateCharacter
);

characterRouter.get("/:characterId/delete", getDeleteForm);
characterRouter.post(
    "/:characterId/delete",
    deleteCharacterValidators,
    deleteCharacter
);

module.exports = characterRouter;
