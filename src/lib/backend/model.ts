export enum Arcana {
    "Fool",
    "Magician",
    "Priestess",
    "Empress",
    "Emperor",
    "Hierophant",
    "Lovers",
    "Chariot",
    "Justice",
    "Hermit",
    "Fortune",
    "Strength",
    "Hanged",
    "Death",
    "Temperance",
    "Devil",
    "Tower",
    "Star",
    "Moon",
    "Sun",
    "Judgement",
    "World"
}

export interface Persona {
    name: string,
    level: number,
    arcana: Arcana,
}