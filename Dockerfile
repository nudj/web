FROM node:6.9.1
WORKDIR /usr/src
COPY src/package.json /usr/src/package.json
RUN cd /usr/src && npm i --production
COPY src/app /usr/src/app
CMD node .
