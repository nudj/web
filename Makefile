IMAGE:=nudj/web
IMAGEDEV:=nudj/web-dev
CWD=$(shell pwd)

.PHONY: build dev

build:
	@docker build \
		-t $(IMAGEDEV) \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		-f $(CWD)/Dockerfile.dev \
		.

ssh:
	-@docker rm -f dev-container 2> /dev/null || true
	@docker run --rm -it \
		--add-host api:127.0.0.1 \
		--env-file $(CWD)/.env \
		--name dev-container \
		-e NPM_TOKEN=${NPM_TOKEN} \
		-p 0.0.0.0:80:80 \
		-p 0.0.0.0:81:81 \
		-p 0.0.0.0:82:82 \
		-v $(CWD)/.zshrc:/root/.zshrc \
		-v $(CWD)/src/lib:/usr/src/lib \
		-v $(CWD)/src/mocks:/usr/src/mocks \
		-v $(CWD)/src/test:/usr/src/test \
		-v $(CWD)/src/.npmrc:/usr/src/.npmrc \
		-v $(CWD)/src/nodemon.json:/usr/src/nodemon.json \
		-v $(CWD)/src/package.json:/usr/src/package.json \
		-v $(CWD)/src/webpack.client.js:/usr/src/webpack.client.js \
		-v $(CWD)/src/webpack.server.js:/usr/src/webpack.server.js \
		$(IMAGEDEV) \
		/bin/zsh
