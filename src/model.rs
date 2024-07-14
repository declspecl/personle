use std::collections::HashMap;

use anyhow::{anyhow, bail};
use serde::{Deserialize, Serialize};

use crate::utils::{try_parse_megaten_fusion_tool_resistances_string, ResistanceLevel};

#[derive(Serialize, Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Arcana
{
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

#[derive(Serialize, Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Stat
{
    Strength,
    Magic,
    Endurance,
    Agility,
    Luck
}

#[derive(Serialize, Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum DamageType
{
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

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PersonaData
{
    pub name: String,
    pub level: i32,
    pub arcana: Arcana,
    pub highest_stat: Stat,
    pub resistances: Vec<DamageType>,
    pub weaknesses: Vec<DamageType>
}

impl PersonaData
{
    pub fn new(
        name: String,
        level: i32,
        arcana: Arcana,
        highest_stat: Stat,
        resistances: Vec<DamageType>,
        weaknesses: Vec<DamageType>
    ) -> PersonaData
    {
        return PersonaData
        {
            name,
            level,
            arcana,
            highest_stat,
            resistances,
            weaknesses
        };
    }
}

impl TryFrom<(String, MegatenFusionToolPersonaData)> for PersonaData
{
    type Error = anyhow::Error;

    fn try_from((name, data): (String, MegatenFusionToolPersonaData)) -> anyhow::Result<Self>
    {
        let highest_stat = {
            let mut highest_stat_and_value: Option<(Stat, i32)> = None;

            let get_stat_from_index = |index: usize| -> anyhow::Result<Stat>
            {
                return Ok(
                    match index
                    {
                        0 => Stat::Strength,
                        1 => Stat::Magic,
                        2 => Stat::Endurance,
                        3 => Stat::Agility,
                        4 => Stat::Luck,
                        _ => bail!("Invalid stat index {}", index)
                    }
                );
            };

            for (i, &stat_value) in data.stats.iter().enumerate()
            {
                match highest_stat_and_value
                {
                    Some((_highest_stat_so_far, highest_value_so_far)) => {
                        if stat_value > highest_value_so_far
                        {
                            highest_stat_and_value = Some((get_stat_from_index(i)?, stat_value));
                        }
                    },
                    None => {
                        highest_stat_and_value = Some((get_stat_from_index(i)?, stat_value));
                    }
                }
            }

            highest_stat_and_value.ok_or(anyhow!("No valid highest stat found for {}: {:#?}", name, data))?.0
        };

        let resistances_by_damage_type = try_parse_megaten_fusion_tool_resistances_string(&data.resists)?;

        let resistances: Vec<DamageType> = resistances_by_damage_type.iter()
            .filter_map(|(damage_type, resistance_level)| {
                return match resistance_level
                {
                    ResistanceLevel::Resist => Some(*damage_type),
                    _ => None
                }
            })
            .collect();

        let weaknesses: Vec<DamageType> = resistances_by_damage_type.iter()
            .filter_map(|(damage_type, resistance_level)| {
                return match resistance_level
                {
                    ResistanceLevel::Weak => Some(*damage_type),
                    _ => None
                }
            })
            .collect();

        return Ok(
            Self::new(
                name,
                data.lvl,
                data.race,
                highest_stat,
                resistances,
                weaknesses
            )
        );
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MegatenFusionToolPersonaData
{
    pub inherits: String,
    pub item: String,
    pub itemr: String,
    pub lvl: i32,
    pub race: Arcana,
    pub resists: String,
    pub skills: HashMap<String, f32>,
    pub stats: Vec<i32>,
    pub r#trait: String
}