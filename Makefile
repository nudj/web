IMAGE:=nudj/web
IMAGEDEV:=nudj/web-dev
CWD=$(shell pwd)

.PHONY: build ssh test

build:
	@docker build \
		-t $(IMAGEDEV) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		-f $(CWD)/Dockerfile.dev \
		.

buildLocal:
	@docker build \
		-t $(IMAGE):local \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		--build-arg NODE_ENV=production \
		-f $(CWD)/Dockerfile \
		.

ssh:
	-@docker rm -f web-dev 2> /dev/null || true
	@docker run --rm -it \
		--add-host api:127.0.0.1 \
		--env-file $(CWD)/.env \
		--name web-dev \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-p 0.0.0.0:80:80 \
		-p 0.0.0.0:81:81 \
		-p 0.0.0.0:82:82 \
		-v $(CWD)/.zshrc:/root/.zshrc \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/.npmrc:/usr/src/.npmrc \
		-v $(CWD)/src/nodemon.json:/usr/src/nodemon.json \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.config.js:/usr/src/webpack.config.js \
		-v $(CWD)/src/webpack.dll.js:/usr/src/webpack.dll.js \
		-v $(CWD)/../framework/src:/usr/src/framework \
		-v $(CWD)/../api/src:/usr/src/api \
		$(IMAGEDEV) \
		/bin/zsh

test:
	-@docker rm -f web-test 2> /dev/null || true
	@docker run --rm -it \
		--name web-test \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		$(IMAGEDEV) \
		/bin/sh -c './node_modules/.bin/standard && ./node_modules/.bin/mocha --recursive test'
