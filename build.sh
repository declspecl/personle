#!/bin/bash

cd personle-website
rm -rf dist
npm run build
sudo mkdir -p /var/www/personle
sudo mv dist/* /var/www/personle
sudo chmod -R 755 /var/www/personle
cd ..

cd personle-api
mvn clean package
sudo mkdir -p /opt/personle/
sudo mv target/personle-api.jar /opt/personle
cd ..

