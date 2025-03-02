#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
const axios = require("axios");

async function createDB() {
    const client = new Client({
        connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:5432/hsr_management`,
    });

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
                image VARCHAR ( 255 )
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
        "https://vizualabstract.github.io/StarRailStaticAPI/db/en/paths.json"
    );
    const data = await response.data;

    const client = new Client({
        connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:5432/hsr_management`,
    });

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
        "https://vizualabstract.github.io/StarRailStaticAPI/assets/image/character_portrait";
    const response = await axios.get(
        "https://vizualabstract.github.io/StarRailStaticAPI/db/en/characters.json"
    );
    const data = await response.data;

    const client = new Client({
        connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:5432/hsr_management`,
    });

    try {
        await client.connect();

        for (const [key, character] of Object.entries(data)) {
            if(character.name == "{NICKNAME}") {
                character.name = character.tag.startsWith("playergirl") ? "Stelle" : "Caelus";
            }
            const query = {
                text: "INSERT INTO characters (name, element, path_id, image) VALUES ($1, $2, $3, $4)",
                values: [
                    character.name,
                    character.element,
                    character.path,
                    `${BASE_IMAGE_URL}/${character.id}.png`,
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
