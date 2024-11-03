#!/bin/bash

# clean build frontend
cd personle-website
rm -rf dist
npm run build
cd ..

# clean build backend
cd personle-api
mvn clean package
cd ..
