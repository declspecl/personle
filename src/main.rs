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

    let persona_data_json = serde_json::to_string_pretty(&persona_data_by_name)?;

    fs::write("persona_data.json", &persona_data_json)
        .await?;

    let mut persona_data_ts_object = persona_data_json;

    for arcana in Arcana::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"{:?}\"", arcana),
            &format!("Arcana.{:?}", arcana)
        );
    }

    for stat in Stat::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"{:?}\"", stat),
            &format!("Stat.{:?}", stat)
        );
    }

    for damage_type in DamageType::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"{:?}\"", damage_type),
            &format!("DamageType.{:?}", damage_type)
        );
    }

    for fusion_method in model::FusionMethod::iter()
    {
        persona_data_ts_object = persona_data_ts_object.replace(
            &format!("\"{:?}\"", fusion_method),
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
