type CreatureType = "NPC" | "Enemy" | "Boss";

type Area =
    | "Ancient Basin"
    | "Abyss"
    | "Colosseum of Fools"
    | "Crystal Peak"
    | "City of Tears"
    | "Deepnest"
    | "Dirtmouth"
    | "Fog Canyon"
    | "Forgotten Crossroads"
    | "Fungal Wastes"
    | "Godhome"
    | "Greenpath"
    | "Howling Cliffs"
    | "Hive"
    | "Kingdom's Edge"
    | "Queen's Gardens"
    | "Resting Grounds"
    | "Royal Waterways"
    | "White Palace";

type AttackType = "None" | "Melee" | "Ranged" | "Summon" | "Bomb";

type Release = "Base Game" | "Godhome" | "Grimm Troupe" | "Lifeblood" | "Hidden Dreams";

interface Creature {
    id: number;
    name: string;
    creatureTypes: CreatureType[];
    areas: Area[];
    attackTypes: AttackType[];
    health: number;
    releases: Release[];
    geo: number;
}

interface RawCreature {
    creature_id: number;
    name: string;
    creatureTypes: string;
    areas: string;
    attackTypes: string;
    health: number;
    releases: string;
    geo: number;
}
