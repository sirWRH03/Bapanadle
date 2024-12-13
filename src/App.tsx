import Header from "./components/Header.tsx";
import Game from "./components/Game.tsx";
import Footer from "./components/Footer.tsx";
import Box from "@mui/material/Box";
import React from "react";

let localIsDailyWon = false;
if (localStorage.getItem("isDailyWon") === "true") localIsDailyWon = true;

export default function App() {
    function onWin() {
        if (!isDailyWon) {
            setIsDailyWon(true);
            localStorage.setItem("isDailyWon", "true");
        }
    }

    const [isDailyWon, setIsDailyWon] = React.useState<boolean>(localIsDailyWon);
    const dailyWinSection = React.useRef<null | HTMLDivElement>(null);

    let answerID = 0;
    if (!isDailyWon) answerID = +(localStorage.getItem("dailyCreature") ?? 0);
    else answerID = Math.floor(Math.random() * 233);

    React.useEffect(() => {
        if (isDailyWon && dailyWinSection.current !== null) {
            dailyWinSection.current.scrollIntoView();
        }
    }, [isDailyWon]);

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
                <Game answerID={answerID} onWin={onWin} isDailyWon={isDailyWon} dailyWinSection={dailyWinSection} />
                <Footer />
            </Box>
        </>
    );
}
