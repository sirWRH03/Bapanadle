import { styled } from "@mui/material/styles";
import Paper, { PaperProps } from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

function convertAccuraciesToColors(accuracy: GuessAccuracy[]) {
    return accuracy.map((accuracy) => {
        switch (accuracy) {
            case "Full":
                return "success";
            case "Partial":
                return "warning";
            case "None":
            case "Greater":
            case "Less":
            default:
                return "error";
        }
    });
}

const HeaderItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "80px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const RowItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    textShadow: "#888 1px 0 10px",
    // boxShadow: "inset 0 0 0.5rem 0.1rem #27313E",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const columnNames = ["Creature", "Type", "Area(s)", "Attack Type(s)", "Health", "Release(s)", "Geo"];
const headerRow = (
    <Grid container key={0}>
        {columnNames.map((columnName, index) => (
            <Grid key={index} size={1}>
                <HeaderItem>{columnName}</HeaderItem>
            </Grid>
        ))}
    </Grid>
);

export default function GuessGrid({ guessRowsData }: { guessRowsData: GuessRowData[] }) {
    const guessRows = guessRowsData.map((rowData, index) => {
        const boxColors = convertAccuraciesToColors(rowData.accuracies);
        return (
            <Grid container key={index + 1}>
                <Grid key={0} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[0]}.main` }}>{rowData.creature.name}</RowItem>
                </Grid>
                <Grid key={1} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[1]}.main` }}>{rowData.creature.creatureTypes.join(", ")}</RowItem>
                </Grid>
                <Grid key={2} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[2]}.main` }}>{rowData.creature.areas.join(", ")}</RowItem>
                </Grid>
                <Grid key={3} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[3]}.main` }}>{rowData.creature.attackTypes.join(", ")}</RowItem>
                </Grid>
                <Grid key={4} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[4]}.main` }}>{rowData.creature.health}</RowItem>
                </Grid>
                <Grid key={5} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[5]}.main` }}>{rowData.creature.releases.join(", ")}</RowItem>
                </Grid>
                <Grid key={6} size={1}>
                    <RowItem sx={{ backgroundColor: `${boxColors[6]}.main` }}>{rowData.creature.geo}</RowItem>
                </Grid>
            </Grid>
        );
    });

    return (
        <Grid container direction="column-reverse" spacing={2} columns={7} sx={{ justifyContent: "center" }}>
            {guessRows}
            {headerRow}
        </Grid>
    );
}
