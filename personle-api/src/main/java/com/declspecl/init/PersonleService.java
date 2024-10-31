package com.declspecl.init;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import java.util.concurrent.ExecutionException;

@SpringBootApplication
@ComponentScan(basePackages = "com.declspecl")
public class PersonleService {
    public static void main(String[] args) throws ExecutionException {
        ApplicationContext applicationContext = SpringApplication.run(PersonleService.class, args);

        DailyPersonaCacheInitializer dailyPersonaCacheInitializer = applicationContext.getBean(DailyPersonaCacheInitializer.class);
        dailyPersonaCacheInitializer.initialize();
    }
}
