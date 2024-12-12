export default function Footer() {
    return (
        <footer
            style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
            }}
        >
            <hr />
            <small style={{ display: "flex", justifyContent: "center" }}>
                {
                    "Based on the video game 'Hollow Knight' by Team Cherry. All assets, names, and data are the Intullectual Property of Team Cherry. Team Cherry does not offically endorse this project."
                }
            </small>
            <small style={{ display: "flex", justifyContent: "center" }}>
                Copyright © 2024 of Will Humphrey, Steven Walter, Brianna White, Alex Myrick. All rights reserved
            </small>
        </footer>
    );
}
