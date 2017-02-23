CWD=$(shell pwd)
BIN:=./node_modules/.bin

.PHONY: build dev run test tdd

build:
	@docker build -t nudj/web .

buildDev:
	@docker build -t nudj/web-dev -f $(CWD)/Dockerfile.dev .

run:
	@docker run -d --rm \
		--name web \
		-p 0.0.0.0:8000:3000 \
		nudj/web
	@echo 'App running on http://localhost:8000/'

dev:
	-@docker rm -f dev-container 2> /dev/null || true
	@docker run --rm -it \
		--name dev-container \
		-p 0.0.0.0:3000:3000 \
		-v $(CWD)/src/app:/usr/src/app \
		nudj/web-dev \
		$(BIN)/nodemon \
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
		nudj/web-dev \
		$(BIN)/mocha test/*.js

tdd:
	-@docker rm -f test-container 2> /dev/null || true
	@docker run --rm -it \
		--name test-container \
		-v $(CWD)/src/app:/usr/src/app \
		-v $(CWD)/src/test:/usr/src/test \
		nudj/web-dev \
		$(BIN)/nodemon \
			--quiet \
			--watch ./ \
			--delay 250ms \
			-x '$(BIN)/mocha test/*.js || exit 1'
