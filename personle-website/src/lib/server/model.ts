export enum Arcana {
    Fool = "Fool",
    Magician = "Magician",
    Priestess = "Priestess",
    Empress = "Empress",
    Emperor = "Emperor",
    Hierophant = "Hierophant",
    Lovers = "Lovers",
    Chariot = "Chariot",
    Justice = "Justice",
    Hermit = "Hermit",
    Fortune = "Fortune",
    Strength = "Strength",
    Hanged = "Hanged",
    Death = "Death",
    Temperance = "Temperance",
    Devil = "Devil",
    Tower = "Tower",
    Star = "Star",
    Moon = "Moon",
    Sun = "Sun",
    Judgement = "Judgement",
    Faith = "Faith",
    Councillor = "Councillor"
}

export enum Stat {
    Strength = "Strength",
    Magic = "Magic",
    Endurance = "Endurance",
    Agility = "Agility",
    Luck = "Luck"
}

export enum DamageType {
    Phys = "Phys",
    Gun = "Gun",
    Fire = "Fire",
    Ice = "Ice",
    Electric = "Electric",
    Wind = "Wind",
    Psychokinesis = "Psychokinesis",
    Nuclear = "Nuclear",
    Bless = "Bless",
    Curse = "Curse",
    Almighty = "Almighty"
}

export enum FusionMethod {
    Dyad = "Dyad",
    Triad = "Triad",
    Special = "Special"
}

export interface PersonaData {
    name: string,
    level: number,
    arcana: Arcana,
    fusionMethod: FusionMethod,
    highestStats: Stat[],
    resistances: DamageType[],
    weaknesses: DamageType[]
}