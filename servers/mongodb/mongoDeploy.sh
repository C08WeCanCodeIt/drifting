#!/usr/bin/env bash

ssh -i ~/.ssh/MyPrivKey.pem ec2-user@18.217.182.145 << EOF

    docker rm -f mongodb

    docker run -d --name mongodb \
    --network driftingNetwork \
    mongo

    exit
EOF
