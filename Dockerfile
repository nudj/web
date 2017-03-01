FROM node:6.10.0-alpine
RUN mkdir -p /usr/www
WORKDIR /usr/www
COPY package.json /usr/www/package.json
RUN npm i --production
COPY src /usr/www/src
# RUN npm i && ./node_modules/.bin/webpack --config ./src/webpack.client.js --bail --hide-modules && ./node_modules/.bin/webpack --config ./src/webpack.server.js --bail --hide-modules && npm prune --production
EXPOSE 3000
CMD node .
