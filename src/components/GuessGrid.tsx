import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import { Tooltip, tooltipClasses } from "@mui/material";

function convertAccuraciesToColors(accuracies: GuessAccuracy[]) {
    return accuracies.map((accuracy) => {
        switch (accuracy) {
            case "Full":
                return "success.main";
            case "Partial":
                return "warning.main";
            case "None":
            case "Greater":
            case "Less":
            default:
                return "background.paper";
        }
    });
}

function convertAccuracyToArrow(accuracy: GuessAccuracy) {
    if (accuracy === "Greater") return <ArrowDownward />;
    else if (accuracy === "Less") return <ArrowUpward />;
    else return null;
}

function splitText(textArr: string[]) {
    if (textArr.length > 2) return [`${textArr[0]}, ${textArr[1]}...`, `...${textArr.slice(2).join(", ")}`];
    else return [textArr.join(", "), ""];
}

const HeaderItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textShadow: "#FFF 0px 0px 5px",
    textAlign: "center",
    width: "80px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const RowItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: "1px",
    fontSize: "small",
    textAlign: "center",
    textShadow: "#888 1px 0 10px",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.1rem",
    userSelect: "none",
    backgroundColor: theme.slate.main,
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
        const healthArrow = convertAccuracyToArrow(rowData.accuracies[4]);
        const geoArrow = convertAccuracyToArrow(rowData.accuracies[6]);
        const [areasTextBeginning, areasTextEnd] = splitText(rowData.creature.areas);
        const rowTexts = [
            rowData.creature.name,
            rowData.creature.creatureTypes.join(", "),
            areasTextBeginning,
            rowData.creature.attackTypes.join(", "),
            rowData.creature.health,
            rowData.creature.releases.join(", "),
            rowData.creature.geo,
        ];
        const img = (
            <Box
                sx={{
                    width: 75,
                    height: 75,
                    backgroundImage: `url(/characterIcons/${rowData.creature.name.replaceAll(" ", "_").replaceAll("'", "")}.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                }}
            ></Box>
        );
        const rows = rowTexts.map((text, i) => (
            <Grid key={i} size={1}>
                <Tooltip
                    title={i === 2 ? areasTextEnd : ""}
                    slotProps={{
                        popper: {
                            sx: {
                                [`&.${tooltipClasses.popper} .${tooltipClasses.tooltip}`]: {
                                    textAlign: "center",
                                    maxWidth: "150px",
                                },
                            },
                            modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, -14],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <Grow in={true} style={{ transformOrigin: "center left" }} timeout={650 * i}>
                        <RowItem
                            sx={{
                                backgroundColor: boxColors[i],
                                flexDirection: i === 0 ? "column" : "row",
                                fontSize: i === 0 ? (text.toString().length > 12 ? "x-small" : "small") : "small",
                            }}
                        >
                            {i === 0 ? img : null}
                            {text}
                            {i === 4 ? healthArrow : null}
                            {i === 6 ? geoArrow : null}
                        </RowItem>
                    </Grow>
                </Tooltip>
            </Grid>
        ));
        return (
            <Grid container key={index + 1}>
                {rows}
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
