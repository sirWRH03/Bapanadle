import Header from "./components/Header.tsx";
import Game from "./components/Game.tsx";
import Footer from "./components/Footer.tsx";
import Box from "@mui/material/Box";
import React from "react";

import randomCreatureID from "./randomCreatureID.ts";

export default function App() {
    /**
     * Handles the win condition.
     *
     * @param accuracyGrid The accuracies of the guesses.
     * @returns No return value.
     *
     */
    function onWin(accuracies: GuessAccuracy[][]) {
        if (dailyAccuracies.length === 0) setDailyAccuracies(accuracies);
        setIsGameOver(true);
    }

    /**
     * Handles the new game condition.
     *
     * @returns No return value.
     *
     */
    function onNewGame() {
        setIsGameOver(false);
        setAnswerID(randomCreatureID());
    }

    const localDailyAccuracies = JSON.parse(localStorage.getItem("dailyAccuracies") ?? "[]");

    const [dailyAccuracies, setDailyAccuracies] = React.useState<GuessAccuracy[][]>(localDailyAccuracies);

    const localDailyCreatureID = +(localStorage.getItem("dailyCreatureID") ?? -1);
    let startingAnswerID = randomCreatureID();
    if (dailyAccuracies.length === 0) startingAnswerID = localDailyCreatureID;

    const [answerID, setAnswerID] = React.useState<number>(startingAnswerID);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

    React.useEffect(() => {
        localStorage.setItem("dailyAccuracies", JSON.stringify(dailyAccuracies));
    }, [dailyAccuracies.length]);

    return (
        <>
            <Box
                sx={{
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundImage: "url(/background.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                }}
            >
                <Header />
                <Game answerID={answerID} isGameOver={isGameOver} dailyAccuracies={dailyAccuracies} onWin={onWin} onNewGame={onNewGame} />
                <Footer />
            </Box>
        </>
    );
}
