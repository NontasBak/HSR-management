const { Router } = require("express");

const pathRouter = Router();

pathRouter.get("/:pathId", (req, res) => {
    res.send(`Hello, ${req.params.pathId}!`);
});

pathRouter.get("/:pathId/characters/:characterId", (req, res) => {
    res.send(`Hello, ${req.params.characterId}!`);
});

module.exports = pathRouter;
