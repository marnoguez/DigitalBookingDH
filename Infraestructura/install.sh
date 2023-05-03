#!/bin/bash

# Update the package repository and install nginx
sudo apt-get update
sudo apt-get install -y nginx screen

# Install Java 11
wget https://download.oracle.com/java/19/latest/jdk-19_linux-x64_bin.deb
sudo apt-get -qqy install ./jdk-19_linux-x64_bin.deb
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-19/bin/java 1919

# Create a new configuration file for the reverse proxy
sudo cat << EOF > /etc/nginx/conf.d/reverse-proxy.conf
server {
    listen 80;
    listen [::]:80;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

sudo rm /etc/nginx/sites-enabled/default

# Test the configuration and restart nginx
sudo nginx -t && sudo service nginx restart

