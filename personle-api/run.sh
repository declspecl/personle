#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Must specify spring profile as first and only argument, either 'dev' or 'prod'"
    echo "Usage: run.cmd <dev|prod>"
else
  if [ $1 = "dev" ]; then
    export AWS_ACCESS_KEY_ID=test
    export AWS_SECRET_ACCESS_KEY=test
  fi

	./mvnw clean spring-boot:run -Dspring-boot.run.profiles="$1"
fi