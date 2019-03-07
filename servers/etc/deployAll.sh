#!/usr/bin/env bash

# deploy SQL
sh ../sqldb/deploy.sh

# deploy mongoDB
sh ../mongodb/mongoDeploy.sh

# deploy rabbitmq
sh ../rabbitMQ/rabbitDeploy.sh

# deploy bottles
sh ../bottles/deploy.sh

# deploy gateway
sh ../gateway/deploy.sh
