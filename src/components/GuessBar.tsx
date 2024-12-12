import { useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import creatures from "../creatures.ts";

export default function GuessBar({ guesses, guess }: { guesses: number[]; guess: (creature: Creature) => void }) {
    const options = creatures.filter((creature) => !guesses.includes(creature.id));
    const [guessValue, setGuessValue] = useState<Creature | null>(null);

    function onGuess() {
        if (guessValue !== null && options.includes(guessValue)) guess(guessValue);
        setGuessValue(null);
    }

    return (
        <>
            <form action={onGuess}>
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
                            const { key, ...optionProps } = props;
                            return (
                                <Box
                                    key={key}
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
                                            backgroundImage: `url(/characterIcons/${creature.name.replace(" ", "_")}.png)`,
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
