use std::collections::BTreeMap;

use collation::try_collate_persona_data;
use model::PersonaData;
use tokio::fs;

pub mod model;
pub mod utils;
pub mod collation;

#[tokio::main]
async fn main() -> anyhow::Result<()>
{
    let p5r_persona_data_url = "https://raw.githubusercontent.com/aqiu384/megaten-fusion-tool/master/src/app/p5r/data/demon-data.json";

    let mut persona_data = try_collate_persona_data(p5r_persona_data_url)
        .await?;

    persona_data.sort_by_key(|data| data.name.to_lowercase());

    let persona_data_by_name: BTreeMap<String, PersonaData> = persona_data.into_iter()
        .map(|data| (data.name.clone(), data))
        .collect();

    let persona_data_json = serde_json::to_string_pretty(&persona_data_by_name)?;

    fs::write("persona_data.json", persona_data_json)
        .await?;

    return Ok(());
}
