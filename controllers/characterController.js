const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

async function getCharacterInfo(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    res.render("characterInfoPage", { characterDetails });
}

async function getEditForm(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    const paths = await db.getPaths();
    const elements = await db.getElements();

    res.render("characterEditPage", { characterDetails, paths, elements });
}

const editCharacterValidators = [
    body("characterName")
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "Character name is required and must be between 1-255 characters"
        ),

    body("characterPath")
        .notEmpty()
        .trim()
        .custom(async (value) => {
            const validPaths = await db.getPaths();
            if (!validPaths.includes(value)) {
                throw new Error("Path must be one of the valid paths");
            }
            return true;
        }),

    body("characterElement")
        .notEmpty()
        .trim()
        .custom(async (value) => {
            const validElements = await db.getElements();
            if (!validElements.includes(value)) {
                throw new Error("Element must be one of the valid elements");
            }
            return true;
        }),

    body("characterRarity")
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rarity must be between 1 and 5"),

    body("characterDescription")
        .notEmpty()
        .trim()
        .isLength({ min: 1, max: 1500 })
        .withMessage(
            "Description is required and must be between 1-1500 characters"
        ),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .equals(process.env.PASSWORD)
        .withMessage("Incorrect password"),
];

async function updateCharacter(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const characterDetails = await db.getCharacterDetails(
            req.params.characterId
        );
        const paths = await db.getPaths();
        const elements = await db.getElements();

        return res.status(400).render("characterEditPage", {
            characterDetails,
            paths,
            elements,
            errors: errors.array(),
        });
    }

    const {
        characterName,
        characterPath,
        characterElement,
        characterRarity,
        characterDescription,
    } = req.body;

    await db.updateCharacter(
        req.params.characterId,
        characterName,
        characterPath,
        characterElement,
        characterRarity,
        characterDescription
    );

    res.redirect(`/characters/${req.params.characterId}`);
}

async function getDeleteForm(req, res) {
    const characterDetails = await db.getCharacterDetails(
        req.params.characterId
    );
    res.render("characterDeletePage", { characterDetails });
}

const deleteCharacterValidators = [
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .equals(process.env.PASSWORD)
        .withMessage("Incorrect password"),
];

async function deleteCharacter(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const characterDetails = await db.getCharacterDetails(
            req.params.characterId
        );
        return res.status(400).render("characterDeletePage", {
            characterDetails,
            errors: errors.array(),
        });
    }

    await db.deleteCharacter(req.params.characterId);
    res.redirect("/");
}

module.exports = {
    getCharacterInfo,
    getEditForm,
    editCharacterValidators,
    updateCharacter,
    getDeleteForm,
    deleteCharacterValidators,
    deleteCharacter,
};
