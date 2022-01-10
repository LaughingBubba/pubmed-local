FROM node:17-bullseye

WORKDIR ./
COPY package.json .
RUN npm install
COPY . .
CMD node ./src/oplog
EXPOSE 27017