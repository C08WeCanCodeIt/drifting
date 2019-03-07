#!/bin/sh
GOOS=linux go build
docker build -t wecancodeit/gateway .
docker push wecancodeit/gateway
go clean