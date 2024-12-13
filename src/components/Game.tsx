import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import GuessBar from "./GuessBar.tsx";
import GuessGrid from "./GuessGrid.tsx";
import DailyWinSection from "./DailyWinSection.tsx";

let creatures: Creature[] = [];
const localCreatures = localStorage.getItem("creatures");
if (localCreatures !== null) creatures = JSON.parse(localCreatures) as Creature[];

const findAccuracy = (guessArr: string[], answerArr: string[]): GuessAccuracy => {
    if (guessArr.length === answerArr.length && guessArr.every((guess) => answerArr.includes(guess))) return "Full";
    else if (guessArr.some((guess) => answerArr.includes(guess))) return "Partial";
    else return "None";
};

const determineAccuracies = (guessID: number, answerID: number): GuessAccuracy[] => {
    if (guessID === answerID) return ["Full", "Full", "Full", "Full", "Full", "Full", "Full"];
    const g = creatures[guessID];
    const a = creatures[answerID];
    const accuracies: GuessAccuracy[] = [
        "None",
        findAccuracy(g.creatureTypes, a.creatureTypes),
        findAccuracy(g.areas, a.areas),
        findAccuracy(g.attackTypes, a.attackTypes),
        g.health === a.health ? "Full" : g.health < a.health ? "Less" : "Greater",
        findAccuracy(g.releases, a.releases),
        g.geo === a.geo ? "Full" : g.geo < a.geo ? "Less" : "Greater",
    ];

    return accuracies;
};

export default function Game({
    answerID,
    onWin,
    isDailyWon,
    dailyWinSection,
}: {
    answerID: number;
    onWin: () => void;
    isDailyWon: boolean;
    dailyWinSection: React.RefObject<HTMLDivElement | null>;
}) {
    function onGuess(creature: Creature) {
        if (creature !== undefined) {
            setGuesses((prevGuesses) => [...prevGuesses, creature.id]);
            if (creature.id === answerID) winGame();
        }
    }

    function winGame() {
        if (!isDailyWon) {
            setFinalDailyGuessAccuracies(guesses.map((guessID) => determineAccuracies(guessID, answerID)));
            localStorage.setItem("finalDailyGuessAccuracies", JSON.stringify(finalDailyGuessAccuracies));
        }
        onWin();
    }

    const [guesses, setGuesses] = React.useState<number[]>([]);
    const [finalDailyGuessAccuracies, setFinalDailyGuessAccuracies] = React.useState<GuessAccuracy[][]>([]);

    const guessRowsData: GuessRowData[] = guesses.map((id) => ({
        creature: creatures[id],
        accuracies: determineAccuracies(id, answerID),
    }));

    return (
        <Box flex="1 1 auto">
            <Container maxWidth="md">
                <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <GuessBar guesses={guesses} onGuess={onGuess} />
                    <GuessGrid guessRowsData={guessRowsData} />
                    {isDailyWon && <DailyWinSection ref={dailyWinSection} guessAccuracyGrid={finalDailyGuessAccuracies} />}
                </Stack>
            </Container>
        </Box>
    );
}
