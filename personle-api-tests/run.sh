#!/bin/bash

python3 -m venv .venv
source ./.venv/bin/activate
pip install -r requirements.txt
python3 src/main.py