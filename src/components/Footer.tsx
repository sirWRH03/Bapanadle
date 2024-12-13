import Box from "@mui/material/Box";

export default function Footer() {
    return (
        <Box component="footer" flex="0 1 auto">
            <small style={{ display: "flex", justifyContent: "center" }}>
                {
                    "Based on the video game 'Hollow Knight' by Team Cherry. All assets, names, and data are the Intullectual Property of Team Cherry. Team Cherry does not offically endorse this project."
                }
            </small>
            <small style={{ display: "flex", justifyContent: "center" }}>
                Copyright © 2024 of Will Humphrey, Steven Walter, Brianna White, Alex Myrick. All rights reserved
            </small>
        </Box>
    );
}
