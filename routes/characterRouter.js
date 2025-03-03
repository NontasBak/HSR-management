const { Router } = require("express");
const { getCharacterInfo } = require("../controllers/characterController");

const characterRouter = Router();

characterRouter.get("/:characterId", getCharacterInfo);

module.exports = characterRouter;