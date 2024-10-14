use std::collections::HashMap;

use anyhow::bail;
use serde::{Deserialize, Serialize};

use crate::model::DamageType;

#[derive(Serialize, Deserialize, Debug, Clone, Copy, PartialEq, Eq)]
pub enum ResistanceLevel {
    Resist,
    Null,
    Weak,
    Neutral,
    Absorb,
    Repel
}

fn get_resistance_level_from_letter(character: char) -> anyhow::Result<ResistanceLevel> {
    return Ok(match character {
        '-' => ResistanceLevel::Neutral,
        's' => ResistanceLevel::Resist,
        'n' => ResistanceLevel::Null,
        'w' => ResistanceLevel::Weak,
        'd' => ResistanceLevel::Absorb,
        'r' => ResistanceLevel::Repel,
        _ => bail!("Invalid resistance character: {}", character)
    });
}

fn get_damage_type_from_index(index: usize) -> anyhow::Result<DamageType> {
    return Ok(match index {
        0 => DamageType::Phys,
        1 => DamageType::Gun,
        2 => DamageType::Fire,
        3 => DamageType::Ice,
        4 => DamageType::Electric,
        5 => DamageType::Wind,
        6 => DamageType::Psychokinesis,
        7 => DamageType::Nuclear,
        8 => DamageType::Bless,
        9 => DamageType::Curse,
        10 => DamageType::Almighty,
        _ => bail!("Invalid damage type index: {}", index)
    });
}

pub fn try_parse_megaten_fusion_tool_resistances_string(resistances: &str) -> anyhow::Result<HashMap<DamageType, ResistanceLevel>> {
    let mut resistance_map = HashMap::new();

    const EXPECTED_NUMBER_OF_DAMAGE_TYPES: usize = 11;
    if resistances.len() != EXPECTED_NUMBER_OF_DAMAGE_TYPES {
        bail!("Invalid number of resistance characters: {}", resistances.len());
    }

    for (index, character) in resistances.chars().enumerate() {
        let damage_type = get_damage_type_from_index(index)?;
        let resistance_level = get_resistance_level_from_letter(character)?;

        resistance_map.insert(damage_type, resistance_level);
    }

    return Ok(resistance_map);
}
