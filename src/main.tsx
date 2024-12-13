import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { initializeApp } from "firebase/app";
import axios from "axios";

import App from "./App.tsx";

import { themeOptions } from "./themeOptions.ts";
import "./index.css";

// Initialize the web app!
const firebaseConfig = {
    apiKey: "AIzaSyBOa-U8vaK5jwVdy3kvOUGPa8Y-pjTWdCA",
    authDomain: "bapanadle.firebaseapp.com",
    projectId: "bapanadle",
    storageBucket: "bapanadle.firebasestorage.app",
    messagingSenderId: "93106692969",
    appId: "1:93106692969:web:c970591a664a108eb053f8",
    measurementId: "G-10PDGP8ZHN",
};
initializeApp(firebaseConfig);

await Promise.all([getCreatures(), getTodaysCreature()]).catch((err) => {
    console.log(err);
    alert("Failed to get creature data. Please refresh to try again.");
});

// for (const creature of JSON.parse(localStorage.getItem("creatures") ?? "")) {
//     const link = document.createElement("link");
//     link.rel = "preload";
//     link.as = "image";
//     link.href = `/characterIcons/${creature.name.replaceAll(" ", "_").replaceAll("'", "")}.png)`;
//     document.head.appendChild(link);
// }

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <StrictMode>
        <ThemeProvider theme={createTheme(themeOptions)}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>,
);

// Async API calls and processing
async function getCreatures() {
    const response = await axios.get("http://3.145.138.93:8080/api/creatures");
    return processCreatures(response.data.data);
}
function processCreatures(rawCreatures: RawCreature[]) {
    const creatures: Creature[] = rawCreatures.map((rc: RawCreature) => {
        return {
            id: rc.creature_id - 1,
            name: rc.name,
            creatureTypes: rc.creatureTypes.split(",") as CreatureType[],
            areas: rc.areas.split(",") as Area[],
            attackTypes: rc.attackTypes.split(",") as AttackType[],
            health: rc.health,
            releases: rc.releases.split(",") as Release[],
            geo: rc.geo,
        };
    });
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

async function getTodaysCreature() {
    const response = await axios.get("http://3.145.138.93:8080/api/dailycreature");
    return processTodaysCreature(response.data.data[0].creature_id);
}

function processTodaysCreature(rawCreatureID: number) {
    const todaysCreatureID = rawCreatureID - 1;
    const localCreature = localStorage.getItem("dailyCreature");
    // A day has passed or the user cleared their cookies, so the daily hasn't been won yet
    if (localCreature && +localCreature !== todaysCreatureID) localStorage.setItem("isDailyWon", "false");
    localStorage.setItem("dailyCreature", todaysCreatureID.toString());
}
