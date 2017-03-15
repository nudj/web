IMAGE:=nudj/web
IMAGEDEV:=nudj/web-dev

CWD=$(shell pwd)
BIN:=./node_modules/.bin

.PHONY: build buildDev run dev packClient packServer pack test tdd

build:
	@docker build \
		-t $(IMAGE) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		.

buildDev:
	@docker build \
		-t $(IMAGEDEV) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		-f $(CWD)/Dockerfile.dev \
		.

run:
	@docker run -it --rm \
		--name web \
		-p 0.0.0.0:4000:3000 \
		$(IMAGE)
	@echo 'App running on http://localhost:4000/'

dev:
	-@docker rm -f dev-container 2> /dev/null || true
	@docker run --rm -it \
		--name dev-container \
		-p 0.0.0.0:3000:3000 \
		-p 0.0.0.0:3001:3001 \
		--add-host api:127.0.0.1 \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/mocks:/usr/src/mocks \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		$(IMAGEDEV) \
		$(BIN)/nodemon \
			--config ./nodemon.json \
			-e js,html,css \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x 'printf "\n\nBuilding...\n" && ./node_modules/.bin/webpack --config ./webpack.client.js --bail --hide-modules && ./node_modules/.bin/webpack --config ./webpack.server.js --bail --hide-modules && node .'

packClient:
	@docker exec -i dev-container \
		$(BIN)/webpack --config ./src/webpack.client.js --bail --hide-modules

packServer:
	@docker exec -i dev-container \
		$(BIN)/webpack --config ./src/webpack.server.js --bail --hide-modules

pack: packClient packServer

test:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV)

tdd:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV) \
		$(BIN)/nodemon \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x '$(BIN)/mocha test/*.js || exit 1'
