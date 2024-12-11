type GuessAccuracy = "Full" | "Partial" | "None" | "Greater" | "Less";

interface GuessRowData {
    creature: Creature;
    accuracies: GuessAccuracy[];
}
