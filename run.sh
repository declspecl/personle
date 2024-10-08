#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Must specify spring profile as first and only argument, either 'dev' or 'prod'"
    echo "Usage: run.cmd <dev|prod>"
else
	./mvnw clean spring-boot:run -Dspring-boot.run.profiles="$1"
fi