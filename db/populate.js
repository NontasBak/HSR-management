#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
const axios = require("axios");
const { dbConfig } = require("./config");

async function createDB() {
    const client = new Client(dbConfig);

    try {
        const SQL = `
            CREATE TABLE IF NOT EXISTS path (
                id VARCHAR ( 255 ) PRIMARY KEY,
                text VARCHAR ( 255 )
            );

            CREATE TABLE IF NOT EXISTS characters (
                id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                name VARCHAR ( 255 ),
                element VARCHAR ( 255 ),
                path_id VARCHAR ( 255 ) REFERENCES path ( id ),
                image VARCHAR ( 255 ),
                image_full VARCHAR ( 255 ),
                rarity INTEGER,
                description TEXT
            );
        `;

        await client.connect();
        await client.query(SQL);
    } catch (error) {
        console.error("Error creating tables:", error);
    } finally {
        await client.end();
    }
}

async function getPaths() {
    const response = await axios.get(
        "https://aiko-chan-ai.github.io/StarRailRes/index_new/en/paths.json"
    );
    const data = await response.data;

    const client = new Client(dbConfig);

    try {
        await client.connect();

        for (const [key, path] of Object.entries(data)) {
            const query = {
                text: "INSERT INTO path (id, text) VALUES ($1, $2)",
                values: [path.id, path.text],
            };

            await client.query(query);
            console.log(`Inserted path ${path.id}`);
        }
    } catch (error) {
        console.error("Error inserting paths:", error);
    } finally {
        await client.end();
    }
}

async function getCharacters() {
    const BASE_IMAGE_URL =
        "https://aiko-chan-ai.github.io/StarRailRes/image/character_preview";
    const BASE_IMAGE_URL_FULL =
        "https://aiko-chan-ai.github.io/StarRailRes/image/character_portrait";

    const response = await axios.get(
        "https://aiko-chan-ai.github.io/StarRailRes/index_new/en/characters.json"
    );
    const data = await response.data;

    const descriptionsResponse = await axios.get(
        "https://aiko-chan-ai.github.io/StarRailRes/index_new/en/descriptions.json"
    );
    const descriptionsData = await descriptionsResponse.data;

    const client = new Client(dbConfig);

    try {
        await client.connect();

        for (const [key, character] of Object.entries(data)) {
            let characterDescription = "";
            for (const [keyDesc, characterDesc] of Object.entries(
                descriptionsData
            )) {
                if (
                    character.name.includes(characterDesc.title) ||
                    characterDesc.title.includes(character.name)
                ) {
                    characterDescription = characterDesc.desc;
                    break;
                }
            }
            if (character.name == "{NICKNAME}") {
                const isGirl = character.tag.startsWith("playergirl");
                character.name = isGirl ? "Stelle" : "Caelus";
                characterDescription = isGirl
                    ? "A girl who boarded the Astral Express. She chose to travel with the Astral Express to eliminate the dangers posed by the Stellaron."
                    : "A guy who boarded the Astral Express. He chose to travel with the Astral Express to eliminate the dangers posed by the Stellaron.";
            }
            const query = {
                text: "INSERT INTO characters (name, element, path_id, image, image_full, rarity, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                values: [
                    character.name,
                    character.element,
                    character.path,
                    `${BASE_IMAGE_URL}/${character.id}.png`,
                    `${BASE_IMAGE_URL_FULL}/${character.id}.png`,
                    character.rarity,
                    characterDescription,
                ],
            };

            await client.query(query);
            console.log(`Inserted character ${character.name}`);
        }
    } catch (error) {
        console.error("Error inserting characters:", error);
    } finally {
        await client.end();
    }
}

async function main() {
    await createDB();
    await getPaths();
    await getCharacters();
    console.log("done");
}

main();
