import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";

import GuessBar from "./GuessBar.tsx";
import GuessGrid from "./GuessGrid.tsx";
import ShareModal from "./ShareModal.tsx";

// Get the accuracy types for properties with multiple values
const findAccuracy = (guessArr: string[], answerArr: string[]): GuessAccuracy => {
    if (guessArr.length === answerArr.length && guessArr.every((guess) => answerArr.includes(guess))) return "Full";
    else if (guessArr.some((guess) => answerArr.includes(guess))) return "Partial";
    else return "None";
};

/**
 * Returns an array of accuracies for each category of the guess.
 *
 * @param guess The guessed creature
 * @param answer The correct creature
 * @returns An array of accuracies for each category of the guess.
 *
 */
function determineAccuracies(guess: Creature, answer: Creature): GuessAccuracy[] {
    if (guess.id === answer.id) return ["Full", "Full", "Full", "Full", "Full", "Full", "Full"];
    const accuracies: GuessAccuracy[] = [
        "None",
        findAccuracy(guess.creatureTypes, answer.creatureTypes),
        findAccuracy(guess.areas, answer.areas),
        findAccuracy(guess.attackTypes, answer.attackTypes),
        guess.health === answer.health ? "Full" : guess.health < answer.health ? "Less" : "Greater",
        findAccuracy(guess.releases, answer.releases),
        guess.geo === answer.geo ? "Full" : guess.geo < answer.geo ? "Less" : "Greater",
    ];

    return accuracies;
}

export default function Game({
    answerID,
    isGameOver,
    dailyAccuracies,
    onWin,
    onNewGame,
}: {
    answerID: number;
    isGameOver: boolean;
    dailyAccuracies: GuessAccuracy[][];
    onWin: (accuracies: GuessAccuracy[][]) => void;
    onNewGame: () => void;
}) {
    // Load creatures from local storage
    const creatures: Creature[] = JSON.parse(localStorage.getItem("creatures") ?? "{}");

    // Called on guess when the form submits using the "Submit" button
    function onGuess(creature: Creature) {
        if (creature !== undefined) {
            setGuesses([...guesses, creature.id]);
        }
    }

    const [guesses, setGuesses] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (guesses.length === 0 && isGameOver) onNewGame();
        else if (guesses.at(-1) === answerID) onWin(guesses.map((id) => determineAccuracies(creatures[id], creatures[answerID])));
    }, [guesses.length]);

    const guessRowsData: GuessRowData[] = guesses.map((id) => ({
        creature: creatures[id],
        accuracies: determineAccuracies(creatures[id], creatures[answerID]),
    }));

    const [isShareModalOpen, setIsShareModalOpen] = React.useState<boolean>(false);

    return (
        <Box flex="1 1 auto">
            <Container maxWidth="md">
                <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    {dailyAccuracies.length > 0 && (
                        <Button variant="contained" onClick={() => setIsShareModalOpen(true)} color="success">
                            Share Daily
                            <ShareIcon />
                        </Button>
                    )}
                    {!isGameOver && <GuessBar guesses={guesses} onGuess={onGuess} />}
                    <GuessGrid guessRowsData={guessRowsData} />
                    {isGameOver && (
                        <Button
                            size="large"
                            onClick={() => setGuesses([])}
                            variant="contained"
                            sx={{
                                backgroundColor: "secondary",
                            }}
                        >
                            Play Again
                        </Button>
                    )}
                    {dailyAccuracies.length > 0 && (
                        <ShareModal
                            open={isShareModalOpen}
                            handleClose={() => setIsShareModalOpen(false)}
                            dailyAccuracies={dailyAccuracies}
                        />
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
