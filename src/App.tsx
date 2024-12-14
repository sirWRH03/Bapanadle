import Header from "./components/Header.tsx";
import Game from "./components/Game.tsx";
import Footer from "./components/Footer.tsx";
import Box from "@mui/material/Box";
import React from "react";

export default function App() {
    /**
     * Handles the win condition.
     *
     * @param accuracyGrid The accuracies of the guesses.
     * @returns No return value.
     *
     */
    function onWin(accuracyGrid: GuessAccuracy[][]) {
        console.log(accuracyGrid);
        if (!isDailyWon) {
            localStorage.setItem("isDailyWon", "true");
            localStorage.setItem("dailyAccuracies", JSON.stringify(accuracyGrid));
            setDailyAccuracies(accuracyGrid);
            setIsDailyWon(true);
        }
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
        setAnswerID(Math.floor(Math.random() * 223));
        console.log(answerID);
    }

    const localIsDailyWon = localStorage.getItem("isDailyWon") === "true";
    let localAnswerID = 0;
    if (!localIsDailyWon) localAnswerID = +(localStorage.getItem("dailyCreature") ?? localAnswerID);
    console.log(`localAnswerID: ${localAnswerID}`);
    const localDailyAccuracies = JSON.parse(localStorage.getItem("dailyAccuracies") ?? "[]");

    const [isDailyWon, setIsDailyWon] = React.useState<boolean>(localIsDailyWon);
    const [answerID, setAnswerID] = React.useState<number>(localAnswerID);
    const [dailyAccuracies, setDailyAccuracies] = React.useState<GuessAccuracy[][]>(localDailyAccuracies);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

    console.log(answerID);

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
                <Game
                    answerID={answerID}
                    isDailyWon={isDailyWon}
                    isGameOver={isGameOver}
                    dailyAccuracies={dailyAccuracies}
                    onWin={onWin}
                    onNewGame={onNewGame}
                />
                <Footer />
            </Box>
        </>
    );
}
