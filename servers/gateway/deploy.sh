#!/usr/bin/env bash
./build.sh

docker push wecancodeit/gateway

export TLSCERT=/etc/letsencrypt/live/api.kychiu.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.kychiu.me/privkey.pem
export REDISADDR=redisServer:6379
export MONGOADDR=mongo:27017
export MYSQL_ROOT_PASSWORD="sqldbpassword"
export DSN="root:%s@tcp\(sqldb:3306\)/auth"
export OCEANADDR=ocean:80
export MQNAME=rabbitmq
export MQADDR=rabbitmq:5672


ssh -i ~/.ssh/MyPrivKey.pem ec2-user@18.217.182.145 << EOF

    docker rm -f redisServer
    docker rm -f gateway
    
    docker pull wecancodeit/gateway

    docker run -d --name redisServer \
    --network driftingNetwork \
    redis

    docker run -d --name gateway --network driftingNetwork -p 443:443 -e REDISADDR=$REDISADDR -v /etc/letsencrypt:/etc/letsencrypt:ro -e TLSCERT=$TLSCERT -e TLSKEY=$TLSKEY -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e DSN=$DSN -e OCEANADDR=$OCEANADDR -e MONGOADDR=$MONGOADDR -e MQADDR=$MQADDR -e MQNAME=$MQNAME wecancodeit/gateway
    
    exit
EOF

