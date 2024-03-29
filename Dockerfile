FROM node:8-alpine
ARG NPM_TOKEN
ARG ENVKEY
RUN mkdir -p /usr/src && apk add --no-cache ca-certificates
WORKDIR /usr/src
COPY src /usr/src
RUN yarn --production=false \
  && ./node_modules/.bin/webpack --config ./webpack.config.dll.js --bail --hide-modules \
  && ./node_modules/.bin/webpack --config ./webpack.config.client.js --bail --hide-modules \
  && yarn install --prod --ignore-scripts --prefer-offline \
  && yarn cache clean
EXPOSE 80
CMD ["node", "."]
