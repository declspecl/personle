use std::collections::HashMap;

use crate::model::{MegatenFusionToolPersonaData, PersonaData};

pub async fn try_collate_persona_data() -> anyhow::Result<Vec<PersonaData>> {
    let p5r_persona_data_url = "https://raw.githubusercontent.com/aqiu384/megaten-fusion-tool/master/src/app/p5r/data/demon-data.json";

    let persona_data_by_name: HashMap<String, MegatenFusionToolPersonaData> = serde_json::from_str(
        &reqwest::get(p5r_persona_data_url)
            .await?
            .text()
            .await?
    )?;

    let persona_data: anyhow::Result<Vec<PersonaData>> = persona_data_by_name.into_iter()
        .map(|(name, data)| {
            return PersonaData::try_from((name, data));
        })
        .collect();

    return Ok(persona_data?);
}