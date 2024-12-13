import { Button, Modal, Stack } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

function convertAccuracyToEmoji(accuracy: GuessAccuracy) {
    switch (accuracy) {
        case "Full":
            return "🟩";
        case "Partial":
            return "🟨";
        case "None":
            return "⬛";
        case "Greater":
            return "⬇️";
        case "Less":
            return "⬆️";
    }
}

function createShares(guessAccuracyGrid: GuessAccuracy[][]) {
    let shareText = "";
    const shareJSX = [];
    const numGuesses = guessAccuracyGrid.length;
    for (const accuracyRow of guessAccuracyGrid) {
        const emojiRow = accuracyRow
            .map((accuracy) => convertAccuracyToEmoji(accuracy))
            .slice(1)
            .join("");
        shareText = emojiRow + "\n" + shareText;
        shareJSX.push(<p>{emojiRow}</p>);
    }
    const headerText = `I guessed the Bapanadle in ${numGuesses} ${numGuesses > 1 ? "tries" : "try"}!`;
    shareText = headerText + "\n" + shareText;
    shareText += "\n" + "https://bapanadle.com";
    shareJSX.push(<p>{headerText}</p>);
    shareJSX.reverse();
    shareJSX.push(<p>https://bapanadle.com</p>);
    return {
        shareText: shareText,
        shareJSX: shareJSX,
    };
}

function copyToClipboard(shareText: string) {
    console.log(shareText);
    navigator.clipboard.writeText(shareText.toString());
}

export default function DailyWinModal({
    open,
    handleClose,
    dailyAccuracies,
}: {
    open: boolean;
    handleClose: () => void;
    dailyAccuracies: GuessAccuracy[][];
}) {
    const { shareText, shareJSX } = createShares(dailyAccuracies);
    return (
        <Modal open={open} onClose={handleClose}>
            <Stack
                className="daily-win-stack"
                direction="column"
                gap={1}
                whiteSpace="pre-wrap"
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                fontSize="1.5rem"
                bgcolor="background.paper"
                padding="20px"
                border="2px solid #000"
                position="absolute"
                top="50%"
                left="50%"
                sx={{
                    transform: "translate(-50%, -50%)",
                }}
            >
                {shareJSX}
                <Button onClick={() => copyToClipboard(shareText)}>
                    Copy
                    <ContentPasteIcon />
                </Button>
            </Stack>
        </Modal>
    );
}
