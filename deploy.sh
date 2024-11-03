#!/bin/bash

./build.sh

# move frontend files
sudo mkdir -p /var/www/personle
sudo mv personle-website/dist/* /var/www/personle
sudo chmod -R 755 /var/www/personle

# move backend files
sudo mkdir -p /opt/personle/
sudo mv personle-api/target/personle-api.jar /opt/personle

# set up nginx
sudo rm /etc/nginx/nginx.conf
sudo cp conf/nginx.conf /etc/nginx/
sudo systemctl enable nginx
sudo systemctl restart nginx

# set up personle service
sudo rm /etc/systemd/system/personle.service
sudo cp conf/personle.service /etc/systemd/system/
sudo chmod 644 /etc/systemd/system/personle.service
sudo chown root:root /etc/systemd/system/personle.service
sudo useradd -r personle
sudo chown -R personle:personle /opt/personle
sudo systemctl daemon-reload
sudo systemctl enable personle
sudo systemctl start personle
