use std::path::Path;

use chrono::Datelike;
use log4rs::{
    append::{console::ConsoleAppender, file::FileAppender},
    config::{Appender, Root},
    encode::pattern::PatternEncoder,
    Config
};

pub fn get_log4rs_config(log_dir: &Path) -> Config {
    let stdout_appender = ConsoleAppender::builder().build();

    let now = chrono::Local::now();
    let file_name = format!("personle-tools-{:02}-{:02}-{:02}.log", now.year(), now.month(), now.day());

    let file_appender = FileAppender::builder()
        .encoder(Box::new(PatternEncoder::new("{d} - {m}{n}")))
        .build(log_dir.join(file_name))
        .expect("Fatal error: failed to build log4rs file appender");

    let logging_config = Config::builder()
        .appenders(vec![
            Appender::builder().build("stdout", Box::new(stdout_appender)),
            Appender::builder().build("logfile", Box::new(file_appender)),
        ])
        .build(Root::builder().appenders(vec!["stdout", "logfile"]).build(log::LevelFilter::Info))
        .expect("Fatal error: failed to build log4rs configuration");

    return logging_config;
}

pub fn init_log4rs(log_dir: &Path) {
    log4rs::init_config(get_log4rs_config(log_dir)).expect("Fatal error: failed to initialize log4rs");
}