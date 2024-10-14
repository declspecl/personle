use std::collections::HashMap;

use anyhow::bail;

use crate::{
    model::{DamageType, FusionMethod, MegatenFusionToolPersonaData, PersonaData, Stat},
    utils::{try_parse_megaten_fusion_tool_resistances_string, ResistanceLevel}
};

pub fn try_collate_persona_data(
    megaten_persona_data_by_name: HashMap<String, MegatenFusionToolPersonaData>,
    special_recipes: HashMap<String, Vec<String>>
) -> anyhow::Result<Vec<PersonaData>> {
    let mut persona_data: Vec<PersonaData> = Vec::new();

    for (persona_name, megaten_data) in megaten_persona_data_by_name.into_iter() {
        let highest_stats = {
            let mut highest_stats: Vec<Stat> = Vec::new();
            let mut highest_stat_value = 0;

            let get_stat_from_index = |index: usize| -> anyhow::Result<Stat> {
                return Ok(match index {
                    0 => Stat::Strength,
                    1 => Stat::Magic,
                    2 => Stat::Endurance,
                    3 => Stat::Agility,
                    4 => Stat::Luck,
                    _ => bail!("Invalid stat index {}", index)
                });
            };

            for (i, &stat_value) in megaten_data.stats.iter().enumerate() {
                if stat_value > highest_stat_value {
                    highest_stats.clear();
                    highest_stats.push(get_stat_from_index(i)?);
                    highest_stat_value = stat_value;
                }
                else if stat_value == highest_stat_value {
                    highest_stats.push(get_stat_from_index(i)?);
                }
            }

            highest_stats
        };

        let resistances_by_damage_type = try_parse_megaten_fusion_tool_resistances_string(&megaten_data.resists)?;

        let resistances: Vec<DamageType> = resistances_by_damage_type
            .iter()
            .filter_map(|(damage_type, resistance_level)| {
                return match resistance_level {
                    ResistanceLevel::Resist => Some(*damage_type),
                    _ => None
                };
            })
            .collect();

        let weaknesses: Vec<DamageType> = resistances_by_damage_type
            .iter()
            .filter_map(|(damage_type, resistance_level)| {
                return match resistance_level {
                    ResistanceLevel::Weak => Some(*damage_type),
                    _ => None
                };
            })
            .collect();

        let fusion_method = match special_recipes.get(&persona_name) {
            Some(recipe) => match recipe.len() {
                0 => FusionMethod::Unfusable,
                2 => FusionMethod::Dyad,
                3 => FusionMethod::Triad,
                _ => FusionMethod::Special
            },
            None => FusionMethod::Dyad
        };

        let current_persona_data = PersonaData::new(persona_name, megaten_data.lvl, megaten_data.race, fusion_method, highest_stats, resistances, weaknesses);

        persona_data.push(current_persona_data);
    }

    return Ok(persona_data);
}
