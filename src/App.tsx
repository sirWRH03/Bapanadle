import Header from "./components/Header.tsx";
import Game from "./components/Game.tsx";
import Footer from "./components/Footer.tsx";
import Box from "@mui/material/Box";
import React from "react";

const localIsDailyWon = localStorage.getItem("isDailyWon") === "true";
const localAnswerID = +(localStorage.getItem("dailyCreature") ?? Math.floor(Math.random() * 223));
const localDailyAccuracies = JSON.parse(localStorage.getItem("dailyAccuracies") ?? "");

export default function App() {
    function onWin(accuracyGrid: GuessAccuracy[][]) {
        if (!isDailyWon) {
            localStorage.setItem("isDailyWon", "true");
            localStorage.setItem("dailyAccuracies", JSON.stringify(accuracyGrid));
            setDailyAccuracies(accuracyGrid);
            setIsDailyWon(true);
        }
        setIsGameOver(true);
    }

    function onNewGame() {
        setIsGameOver(false);
        setAnswerID(Math.floor(Math.random() * 223));
        console.log(answerID);
    }

    const [isDailyWon, setIsDailyWon] = React.useState<boolean>(localIsDailyWon);
    const [answerID, setAnswerID] = React.useState<number>(localAnswerID);
    const [dailyAccuracies, setDailyAccuracies] = React.useState<GuessAccuracy[][]>(localDailyAccuracies);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

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
