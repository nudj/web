APP:=web
IMAGE:=nudj/$(APP)
IMAGEDEV:=nudj/$(APP):development
CWD=$(shell pwd)
DOCKERCOMPOSE:=docker-compose -p nudj

.PHONY: build buildLocal up ssh ui cmd down test

build:
	@./build.sh $(IMAGEDEV)

buildLocal:
	@docker build \
		-t $(IMAGE):local \
		--build-arg NODE_ENV=production \
		--build-arg NPM_TOKEN=${NPM_TOKEN} \
		--build-arg ENVKEY=${ENVKEY} \
		-f $(CWD)/Dockerfile \
		.

up:
	@$(DOCKERCOMPOSE) up -d --force-recreate --no-deps $(APP)

ssh:
	@$(DOCKERCOMPOSE) exec $(APP) /bin/zsh

ui:
	@$(DOCKERCOMPOSE) run --rm \
		-v $(CWD)/src/test/ui:/usr/src/ui \
		-v $(CWD)/src/test/output:/usr/src/output \
		ui \
		node /usr/src/ui/index.js

down:
	@$(DOCKERCOMPOSE) rm -f -s $(APP)

test:
	@$(DOCKERCOMPOSE) exec $(APP) /bin/zsh -c './node_modules/.bin/standard && ./node_modules/.bin/mocha --recursive test/unit'
