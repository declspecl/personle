use std::collections::BTreeMap;

use collation::try_collate_persona_data;
use fetchers::{try_fetch_megaten_persona_data, try_fetch_megaten_special_recipes};
use model::{Arcana, DamageType, PersonaData, Stat};
use strum::IntoEnumIterator;
use tokio::fs;

pub mod model;
pub mod utils;
pub mod fetchers;
pub mod collation;

#[tokio::main]
async fn main() -> anyhow::Result<()>
{
    let p5r_persona_data_url = "https://raw.githubusercontent.com/aqiu384/megaten-fusion-tool/master/src/app/p5r/data/demon-data.json";
    let p5r_special_recipes_url = "https://raw.githubusercontent.com/aqiu384/megaten-fusion-tool/master/src/app/p5r/data/special-recipes.json";

    let megaten_persona_data = try_fetch_megaten_persona_data(p5r_persona_data_url)
        .await?;

    let special_recipes = try_fetch_megaten_special_recipes(p5r_special_recipes_url)
        .await?;

    let persona_data = {
        let mut persona_data = try_collate_persona_data(megaten_persona_data, special_recipes)?;

        persona_data.sort_by(|a, b| a.name.cmp(&b.name));

        persona_data
    };

    let persona_data_by_name: BTreeMap<String, PersonaData> = persona_data.into_iter()
        .map(|data| (data.name.clone(), data))
        .collect();

    let mut persona_data_json = serde_json::to_string_pretty(&persona_data_by_name)?;

    for arcana in Arcana::iter()
    {
        persona_data_json = persona_data_json.replace(
            &format!("Arcana.{:?}", arcana),
            &format!("{:?}", arcana)
        );
    }

    for stat in Stat::iter()
    {
        persona_data_json = persona_data_json.replace(
            &format!("Stat.{:?}", stat),
            &format!("{:?}", stat)
        );
    }

    for damage_type in DamageType::iter()
    {
        persona_data_json = persona_data_json.replace(
            &format!("DamageType.{:?}", damage_type),
            &format!("{:?}", damage_type)
        );
    }

    for fusion_method in model::FusionMethod::iter()
    {
        persona_data_json = persona_data_json.replace(
            &format!("FusionMethod.{:?}", fusion_method),
            &format!("{:?}", fusion_method)
        );
    }

    fs::write("persona_data.json", &persona_data_json)
        .await?;

    let persona_data_list: Vec<PersonaData> = persona_data_by_name.into_iter().map(|(_name, data)| data).collect();

    let mut persona_data_ts_object = serde_json::to_string_pretty(&persona_data_list)?;

    for arcana in Arcana::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"Arcana.{:?}\"", arcana),
            &format!("Arcana.{:?}", arcana)
        );
    }

    for stat in Stat::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"Stat.{:?}\"", stat),
            &format!("Stat.{:?}", stat)
        );
    }

    for damage_type in DamageType::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"DamageType.{:?}\"", damage_type),
            &format!("DamageType.{:?}", damage_type)
        );
    }

    for fusion_method in model::FusionMethod::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"FusionMethod.{:?}\"", fusion_method),
            &format!("FusionMethod.{:?}", fusion_method)
        );
    }

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"name\"",
        "name"
    );

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"level\"",
        "level"
    );

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"arcana\"",
        "arcana"
    );

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"fusionMethod\"",
        "fusionMethod"
    );

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"highestStats\"",
        "highestStats"
    );

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"resistances\"",
        "resistances"
    );

    persona_data_ts_object = persona_data_ts_object.replace(
        "\"weaknesses\"",
        "weaknesses"
    );

    fs::write("persona_data.ts", &persona_data_ts_object)
        .await?;

    return Ok(());
}
