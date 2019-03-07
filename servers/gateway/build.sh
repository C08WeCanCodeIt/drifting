GOOS=linux go build

docker build -t wecancodeit/gateway .

go clean