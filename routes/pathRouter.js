const { Router } = require("express");
const { getPathPage } = require("../controllers/pathController");

const pathRouter = Router();

pathRouter.get("/:pathName", getPathPage);

module.exports = pathRouter;
