# web

[![Codefresh build status]( https://g.codefresh.io/api/badges/build?repoOwner=nudj&repoName=web&branch=master&pipelineName=master&accountName=collingo&key=eyJhbGciOiJIUzI1NiJ9.NThhZDVhYzdhOGU4YWUwMTAwMzQ4MTcz.LswrznCGW0BHHD1jCDCg-EWQm_-4_j0qwWCvUTZcCYA&type=cf-1)]( https://g.codefresh.io/repositories/nudj/web/builds?filter=trigger:build;branch:master;service:58af1fc2a6eaef01000f1bd6~master)

Nudj website

## Contributing

### Dependencies

1. Docker
1. Make

### Outside container

1. `make build` to build the image
1. `make ssh` to ssh into container
1. `make test` to run the tests

### Development (Inside container)

1. `run` to run the app
1. `dev` to run the app with a watcher
1. `test` to run the tests
1. `tdd` to run the tests with a watcher
1. `exit` to leave the container and close the ssh session
