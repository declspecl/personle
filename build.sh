#!/bin/bash

# clean build frontend
cd personle-website
rm -rf dist
npm run build
cd ..

# clean build backend
cd personle-api
sudo mkdir -p /var/logs/personle
sudo chmod -R 777 /var/logs/personle
mvn clean package
cd ..
