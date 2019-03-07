#!/usr/bin/env bash

#builds docker container
docker build -t wecancodeit/ocean .

docker push wecancodeit/ocean

