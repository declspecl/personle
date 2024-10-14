use std::collections::HashMap;

use crate::model::MegatenFusionToolPersonaData;

pub async fn try_fetch_megaten_persona_data(persona_data_url: &str) -> anyhow::Result<HashMap<String, MegatenFusionToolPersonaData>> {
    let megaten_persona_data_by_name: HashMap<String, MegatenFusionToolPersonaData> =
        serde_json::from_str(&reqwest::get(persona_data_url).await?.text().await?)?;

    return Ok(megaten_persona_data_by_name);
}

pub async fn try_fetch_megaten_special_recipes(special_recipes_url: &str) -> anyhow::Result<HashMap<String, Vec<String>>> {
    let special_recipes: HashMap<String, Vec<String>> = serde_json::from_str(&reqwest::get(special_recipes_url).await?.text().await?)?;

    return Ok(special_recipes);
}
