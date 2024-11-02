#!/bin/bash

npm install
sudo npm install -g aws-cdk-local aws-cdk
cdklocal bootstrap
cdklocal deploy --all
