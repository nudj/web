# web

[![Codefresh build status]( https://g.codefresh.io/api/badges/build?repoOwner=nudj&repoName=web&branch=master&pipelineName=master&accountName=collingo&key=eyJhbGciOiJIUzI1NiJ9.NThhZDVhYzdhOGU4YWUwMTAwMzQ4MTcz.LswrznCGW0BHHD1jCDCg-EWQm_-4_j0qwWCvUTZcCYA&type=cf-1)]( https://g.codefresh.io/repositories/nudj/web/builds?filter=trigger:build;branch:master;service:58af1fc2a6eaef01000f1bd6~master)

Nudj website

## Contributing

### Dependencies

1. Docker
1. Make

### Outside container

1. Build the Application image
  1. `make build`
1. Run the Application container
  1. `make up` to create or recreate the Application container
  1. `make ssh` to ssh into the running Application container (see Inside Container below)
  1. `make down` to destroy the Application container
1. Utility commands
  1. `make test` to run the unit tests
  1. `make ui` to run the ui tests (Application and Core must be running)

### Inside container

1. `run` to run the app (requires the Core)
1. `dev` to run the app with a watcher (requires the Core)
1. `test` to run the unit tests
1. `tdd` to run the unit tests with a watcher
1. `exit` to leave the container and close the ssh session

### Getting started

#### Setup the Core Applications

1. `git pull git@github.com:nudj/server.git ../server` to ensure you have the `server` repo checked out
1. `(cd ../server && make build)` to ensure you have a current build of the `server` application
1. `make up` to spin up the Core apps (`server`, `redis` and `db`)
1. You will need a `nudj` database and `nudjtech` user setup in your local Arango (ask a colleague for help here)

#### Setup the `api` Application

1. `git pull git@github.com:nudj/api.git ../api` to ensure you have the `api` repo checked out
1. `(cd ../api && make build)` to ensure you have a current build of the `api` application
1. `make build` to ensure you have a current build of the `api` application
1. `make up` to spin up the `api` container
1. `make ssh` to ssh into the `api` container
1. `dev` to run the `api` application in development mode

#### Setup the `web` Application

1. `git pull git@github.com:nudj/web.git ../web` to ensure you have the `web` repo checked out
1. `(cd ../web && make build)` to ensure you have a current build of the `web` application
1. `make build` to ensure you have a current build of the `web` application
1. `make up` to spin up the `web` container
1. `make ssh` to ssh into the `web` container
1. `dev` to run the `web` application in development mode
