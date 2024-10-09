use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use strum::EnumIter;

#[derive(Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
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

impl Serialize for Arcana
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer
    {
        return serializer.serialize_str(&format!("Arcana.{:?}", self));
    }
}

#[derive(Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
pub enum Stat
{
    Strength,
    Magic,
    Endurance,
    Agility,
    Luck
}

impl Serialize for Stat
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer
    {
        return serializer.serialize_str(&format!("Stat.{:?}", self));
    }
}

#[derive(Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
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

impl Serialize for DamageType
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer
    {
        return serializer.serialize_str(&format!("DamageType.{:?}", self));
    }
}

#[derive(Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
pub enum FusionMethod
{
    Dyad,
    Triad,
    Special,
    Unfusable
}

impl Serialize for FusionMethod
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer
    {
        return serializer.serialize_str(&format!("FusionMethod.{:?}", self));
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PersonaData
{
    pub name: String,
    pub level: i32,
    pub arcana: Arcana,
    pub fusion_method: FusionMethod,
    pub highest_stats: Vec<Stat>,
    pub resistances: Vec<DamageType>,
    pub weaknesses: Vec<DamageType>
}

impl PersonaData
{
    pub fn new(
        name: String,
        level: i32,
        arcana: Arcana,
        fusion_method: FusionMethod,
        highest_stats: Vec<Stat>,
        resistances: Vec<DamageType>,
        weaknesses: Vec<DamageType>
    ) -> PersonaData
    {
        return PersonaData
        {
            name,
            level,
            arcana,
            fusion_method,
            highest_stats,
            resistances,
            weaknesses
        };
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