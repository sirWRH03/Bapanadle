import { useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

let creatures: Creature[] = [];
const localCreatures = localStorage.getItem("creatures");
if (localCreatures !== null) creatures = JSON.parse(localCreatures) as Creature[];

export default function GuessBar({ guesses, onGuess }: { guesses: number[]; onGuess: (creature: Creature) => void }) {
    const options = creatures.filter((creature) => !guesses.includes(creature.id));
    const [guessValue, setGuessValue] = useState<Creature | null>(null);

    function guess() {
        if (guessValue !== null && options.includes(guessValue)) onGuess(guessValue);
        setGuessValue(null);
    }

    return (
        <>
            <form action={guess}>
                <Stack direction="row" spacing={0.5} sx={{ width: 500 }}>
                    <Autocomplete
                        sx={{ width: 400 }}
                        value={guessValue || null}
                        onChange={(_, newGuessValue) => setGuessValue(newGuessValue)}
                        options={options}
                        autoHighlight
                        openOnFocus
                        disabled={options.length === 0}
                        getOptionLabel={(creature) => creature.name}
                        renderOption={(props, creature) => {
                            const { ...optionProps } = props;
                            return (
                                <Box
                                    component="li"
                                    sx={{
                                        "& > creatureIcon": {
                                            mr: 2,
                                            flexShrink: 0,
                                        },
                                    }}
                                    {...optionProps}
                                >
                                    <Box
                                        className="creatureIcon"
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            mr: 2,
                                            backgroundImage: `url(/characterIcons/${creature.name.replaceAll(" ", "_")}.png)`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "contain",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                    {creature.name}
                                </Box>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Enter a creature" />}
                    />
                    <Button variant="contained" type="submit" disabled={options.length === 0}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </>
    );
}
