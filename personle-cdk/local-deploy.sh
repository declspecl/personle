#!/bin/bash

sudo npm install -g aws-cdk-local aws-cdk
cdklocal bootstrap
cdklocal deploy