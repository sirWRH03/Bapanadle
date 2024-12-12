import { useState } from "react";
//import axios from "axios";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import GuessBar from "./GuessBar.tsx";
import GuessGrid from "./GuessGrid.tsx";

import creatures from "../creatures.ts";
import Box from "@mui/material/Box";

const findAccuracy = (guessArr: string[], answerArr: string[]): GuessAccuracy => {
    if (guessArr.length === answerArr.length && guessArr.every((guess) => answerArr.includes(guess))) return "Full";
    else if (guessArr.some((guess) => answerArr.includes(guess))) return "Partial";
    else return "None";
};

const determineAccuracies = (guessID: number, answerID: number): GuessAccuracy[] => {
    if (guessID === answerID) return ["Full", "Full", "Full", "Full", "Full", "Full", "Full"];

    const g = creatures[guessID];
    const a = creatures[answerID];
    console.log(g);
    console.log(a);

    const accuracies: GuessAccuracy[] = [
        "None",
        findAccuracy(g.creatureTypes, a.creatureTypes),
        findAccuracy(g.areas, a.areas),
        findAccuracy(g.attackTypes, a.attackTypes),
        g.health === a.health ? "Full" : g.health < a.health ? "Less" : "Greater",
        findAccuracy(g.releases, a.releases),
        g.geo === a.geo ? "Full" : g.geo < a.geo ? "Less" : "Greater",
    ];

    console.log(accuracies);
    return accuracies;
};

export default function Game() {
    function guess(creature: Creature) {
        if (creature !== undefined) {
            setGuesses((prevGuesses) => [...prevGuesses, creature.id]);
            if (creature.id === answerID) winGame();
        }
    }

    function winGame() {
        console.log("You won!");
    }
    // interface Response {
    //     exists: boolean;
    //     data: { character_name: string }[];
    // }
    // const [results, setResults] = useState<{ character_name: string }[]>([]);
    // async function handleGuess() {
    //     if (!guessValue.trim) {
    //         console.log("");
    //         return;
    //     }
    //     try {
    //         const result = await axios.get<Response>("http://localhost:8080/api/characters", {
    //             params: { search: guessValue },
    //         });
    //         if (result.data.exists) {
    //             console.log("Yes, the Character exist in the database");
    //             setResults(result.data.data);
    //         } else {
    //             console.log("No, the character does not exist");
    //             setResults([]);
    //         }
    //     } catch (error) {
    //         console.log("Error getting data");
    //     }
    // }
    const [answerID, setAnswerID] = useState<number>(creatures[Math.floor(Math.random() * creatures.length)].id);
    const [guesses, setGuesses] = useState<number[]>([]);

    const guessRowsData: GuessRowData[] = guesses.map((id) => ({
        creature: creatures[id],
        accuracies: determineAccuracies(id, answerID),
    }));

    return (
        <Box flex="1 1 auto">
            <Container maxWidth="md">
                <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <GuessBar guesses={guesses} guess={guess} />
                    <GuessGrid guessRowsData={guessRowsData} />
                </Stack>
            </Container>
        </Box>
    );
}
