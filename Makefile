CWD=$(shell pwd)
BIN:=./node_modules/.bin

.PHONY: build dev run test tdd

build:
	@docker build -t nudj/web .

dev:
	@docker build -t nudj/web-dev -f $(CWD)/Dockerfile.dev .

run:
	@docker run --rm --name web nudj/web

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
