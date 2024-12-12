import Header from "./components/Header.tsx";
import Game from "./components/Game.tsx";
import Footer from "./components/Footer.tsx";
import Box from "@mui/material/Box";

export default function App() {
    return (
        <>
            <Box
                sx={{
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundImage: "url(/publicAssets/background.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                }}
            >
                <Header />
                <Game />
                <Footer />
            </Box>
        </>
    );
}
