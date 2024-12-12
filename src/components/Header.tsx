const logo = "logo.png";

export default function Header() {
    return (
        <header style={{ display: "flex", justifyContent: "center", paddingBottom: 50, paddingTop: 10 }}>
            <img style={{ height: 165, width: 606 }} src={logo} alt="Bapanadle logo" />
        </header>
    );
}
