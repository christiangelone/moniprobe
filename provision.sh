#!/bin/bash

echo "getting nodejs 6.X from the web..."
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

echo "Updating apt-get..."
sudo apt-get update

echo "Installing nodejs..."
sudo apt-get -y install nodejs

echo "Installing bwm-ng..."
sudo apt-get -y install bwm-ng
