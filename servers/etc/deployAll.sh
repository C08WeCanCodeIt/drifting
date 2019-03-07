#!/usr/bin/env bash

# deploy SQL
sh ../sqldb/deploy.sh

# deploy mongoDB
sh ../mongodb/mongoDeploy.sh

# deploy rabbitmq
sh ../rabbitMQ/rabbitDeploy.sh

sleep 20

# deploy bottles
sh ../bottles/deploy.sh

sleep 20

# deploy gateway
sh ../gateway/deploy.sh
