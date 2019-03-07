#!/usr/bin/env bash
./build.sh

ssh -i ~/.ssh/MyPrivKey.pem ec2-user@18.217.182.145 << EOF
    
    docker rm -f ocean

    docker pull wecancodeit/ocean

    docker run -d \
    --name ocean \
    --network driftingNetwork \
    -e PORT=80 \
    wecancodeit/ocean
    
EOF