export enum Arcana {
    Fool,
    Magician,
    Priestess,
    Empress,
    Emperor,
    Hierophant,
    Lovers,
    Chariot,
    Justice,
    Hermit,
    Fortune,
    Strength,
    Hanged,
    Death,
    Temperance,
    Devil,
    Tower,
    Star,
    Moon,
    Sun,
    Judgement,
    Faith,
    Councillor
}

export enum Stat {
    Strength,
    Magic,
    Endurance,
    Agility,
    Luck
}

export enum DamageType {
    Phys,
    Gun,
    Fire,
    Ice,
    Electric,
    Wind,
    Psychokinesis,
    Nuclear,
    Bless,
    Curse,
    Almighty
}

export interface PersonaData
{
    name: string,
    level: number,
    arcana: Arcana,
    highestStats: Stat[],
    resistances: DamageType[],
    weaknesses: DamageType[]
}