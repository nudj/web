IMAGE:=nudj/web
IMAGEDEV:=nudj/web-dev
DEVURL:=

CWD=$(shell pwd)
BIN:=./node_modules/.bin

.PHONY: build dev run test tdd

build:
	@docker build -t $(IMAGE) .

buildDev:
	@docker build -t $(IMAGEDEV) -f $(CWD)/Dockerfile.dev .

run:
	@docker run -d --rm \
		--name web \
		-p 0.0.0.0:4000:80 \
		$(IMAGE)
	@echo 'App running on http://localhost:4000/'

dev:
	-@docker rm -f dev-container 2> /dev/null || true
	@echo 'App will run on http://localhost:3000/'
	@docker run --rm -it \
		--name dev-container \
		-p 0.0.0.0:3000:80 \
		-v $(CWD)/src/app:/usr/src/app \
		$(IMAGEDEV) \
		$(BIN)/nodemon \
			-e js,html \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x 'node .'

test:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV) \
		$(BIN)/mocha test/*.js

tdd:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		$(IMAGEDEV) \
		$(BIN)/nodemon \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x '$(BIN)/mocha test/*.js || exit 1'
