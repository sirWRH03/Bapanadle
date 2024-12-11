import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

const HeaderItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
    width: "50px",
    height: "50px",
    display: "flex",
}));

const RowItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
    width: "50px",
    height: "50px",
    display: "flex",
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
    const guessRows = guessRowsData.map((rowData, index) => (
        <Grid container key={index + 1}>
            <Grid key={0} size={1}>
                <RowItem>{rowData.creature.name}</RowItem>
            </Grid>
            <Grid key={1} size={1}>
                <RowItem>{rowData.creature.creatureTypes}</RowItem>
            </Grid>
            <Grid key={2} size={1}>
                <RowItem>{rowData.creature.areas}</RowItem>
            </Grid>
            <Grid key={3} size={1}>
                <RowItem>{rowData.creature.attackTypes}</RowItem>
            </Grid>
            <Grid key={4} size={1}>
                <RowItem>{rowData.creature.health}</RowItem>
            </Grid>
            <Grid key={5} size={1}>
                <RowItem>{rowData.creature.releases}</RowItem>
            </Grid>
            <Grid key={6} size={1}>
                <RowItem>{rowData.creature.geo}</RowItem>
            </Grid>
        </Grid>
    ));

    return (
        <Grid container spacing={2} columns={7} sx={{ justifyContent: "center " }}>
            {headerRow}
            {guessRows}
        </Grid>
    );
}
