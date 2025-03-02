const { Router } = require("express");
const { getCharactersAndPaths } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getCharactersAndPaths);

module.exports = indexRouter;
