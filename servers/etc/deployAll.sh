#!/usr/bin/env bash
cd ../sqldb

# deploy SQL
sh deploy.sh

# deploy mongoDB
cd ../mongodb

sh mongoDeploy.sh

# deploy rabbitmq
cd ../rabbitMQ

sh rabbitDeploy.sh

sleep 5

# deploy bottles
cd ../bottles

sh deploy.sh

sleep 5

# deploy gateway
cd ../gateway

sh deploy.sh
