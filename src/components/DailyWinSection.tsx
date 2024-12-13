import { Box } from "@mui/material";

export default function DailyWinSection({
    ref,
    guessAccuracyGrid,
}: {
    ref: React.RefObject<HTMLDivElement | null>;
    guessAccuracyGrid: GuessAccuracy[][];
}) {
    return <Box ref={ref}>{guessAccuracyGrid}</Box>;
}
