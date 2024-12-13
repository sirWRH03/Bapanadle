import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";

import GuessBar from "./GuessBar.tsx";
import GuessGrid from "./GuessGrid.tsx";
import ShareModal from "./ShareModal.tsx";

let creatures: Creature[] = [];
const localCreatures = localStorage.getItem("creatures");
if (localCreatures !== null) creatures = JSON.parse(localCreatures) as Creature[];

const findAccuracy = (guessArr: string[], answerArr: string[]): GuessAccuracy => {
    if (guessArr.length === answerArr.length && guessArr.every((guess) => answerArr.includes(guess))) return "Full";
    else if (guessArr.some((guess) => answerArr.includes(guess))) return "Partial";
    else return "None";
};

function determineAccuracies(guessID: number, answerID: number): GuessAccuracy[] {
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
}

export default function Game({
    answerID,
    isDailyWon,
    isGameOver,
    dailyAccuracies,
    onWin,
    onNewGame,
}: {
    answerID: number;
    isDailyWon: boolean;
    isGameOver: boolean;
    dailyAccuracies: GuessAccuracy[][];
    onWin: (accuracyGrid: GuessAccuracy[][]) => void;
    onNewGame: () => void;
}) {
    function onGuess(creature: Creature) {
        if (creature !== undefined) {
            setGuesses([...guesses, creature.id]);
        }
    }

    function newGame() {
        setGuesses([]);
        onNewGame();
    }

    function handleOpenModal() {
        setisDailyWinModalOpen(true);
    }
    function handleCloseModal() {
        setisDailyWinModalOpen(false);
    }

    const [guesses, setGuesses] = React.useState<number[]>([]);
    const [isDailyWinModalOpen, setisDailyWinModalOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (guesses.length > 0 && guesses.at(-1) === answerID) onWin(guesses.map((id) => determineAccuracies(id, answerID)));
    }, [JSON.stringify(guesses)]);

    const guessRowsData: GuessRowData[] = guesses.map((id) => ({
        creature: creatures[id],
        accuracies: determineAccuracies(id, answerID),
    }));

    return (
        <Box flex="1 1 auto">
            <Container maxWidth="md">
                <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    {isDailyWon && (
                        <Button variant="contained" onClick={handleOpenModal} color="success">
                            Share Daily
                            <ShareIcon />
                        </Button>
                    )}
                    {!isGameOver && <GuessBar guesses={guesses} onGuess={onGuess} isGameOver={isGameOver} />}
                    <GuessGrid guessRowsData={guessRowsData} />
                    {isGameOver && (
                        <Button
                            size="large"
                            onClick={newGame}
                            variant="contained"
                            sx={{
                                backgroundColor: "secondary",
                            }}
                        >
                            Play Again
                        </Button>
                    )}
                    {isDailyWon && (
                        <ShareModal open={isDailyWinModalOpen} handleClose={handleCloseModal} dailyAccuracies={dailyAccuracies} />
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
