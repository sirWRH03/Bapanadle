import { useState } from "react";
import GuessIcon from "./GuessIcon";
import axios from "axios";


interface response {
    exists: boolean;
    data: { character_name: string }[];
}
export default function App() {
    const [guessValue, setGuessValue] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const [results, setResults] = useState<{ character_name: string }[]>([]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleGuess();
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        handleGuess();
    }

    async function handleGuess() {

        if (!guessValue.trim) {
            setResultMessage("");
            return;
        }
        try {
            const result = await axios.get<response>('http://localhost:8080/api/characters', {
                params: { search: guessValue }
            });
            if (result.data.exists) {
                setResultMessage("Yes, the Character exist in the database");
                setResults(result.data.data);
            } else {
                setResultMessage("No, the character does not exist")
                setResults([]);
            }
        } catch (error) {
            setResultMessage("Error getting data")
        }
    }

    return (
        <div className="grid grid-flow-row auto-rows-max justify-items-center h-screen bg-gray-700">
            <div className="text-xl text-center">
                Bapanadle
            </div>
            <form className="flex flex-row place-content-center place-items-center space-x-2 h-16 w-1/4 mt-12" method="post" onSubmit={handleSubmit}>
                <div className="flex basis-1/6 h-32"><GuessIcon guess={guessValue} /></div>
                <input className="basis-4/6 h-8 rounded" type="text" name="guess" value={guessValue} onKeyDown={handleKeyDown} onChange={e => setGuessValue(e.target.value)}></input>
                <button className="basis-1/6 h-8 rounded bg-green-400 hover:bg-green-500" type="submit">Submit</button>
            </form>
            <div className="mt-4 text-white">
                {results.length > 0 &&
                    (<ul> {results.map((result, index) => (<li key={index}> {result.character_name}</li>))}</ul>)}
            </div>
        </div>
    );
}