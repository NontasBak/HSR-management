const { Router } = require("express");
const { getPathPage } = require("../controllers/pathController");

const pathRouter = Router();

pathRouter.get("/:pathName", getPathPage);

pathRouter.get("/:pathName/characters/:characterId", (req, res) => {
    res.send(`Hello, ${req.params.characterId}!`);
});

module.exports = pathRouter;
