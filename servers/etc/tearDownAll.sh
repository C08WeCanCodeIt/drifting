#!/usr/bin/env bash

ssh -i ~/.ssh/MyPrivKey.pem ec2-user@18.217.182.145 << EOF
    
    docker rm -f sqldb
    docker rm -f mongodb
    docker rm -f rabbitmq
    docker rm -f ocean
    docker rm -f redisServer
    docker rm -f gateway
    docker network rm driftingNetwork
 
EOF