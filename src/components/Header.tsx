import Box from "@mui/material/Box";

const logo = "logo.png";

export default function Header() {
    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1.15rem",
                paddingBottom: "1.15rem",
                flex: "0 1 auto",
            }}
        >
            {/*<img style={{ height: 95, width: 95 }} src={iselda} alt="Iselda" /> */}
            <img style={{ height: 70, width: 606 }} src={logo} alt="Bapanadle logo" />
        </Box>
    );
}
