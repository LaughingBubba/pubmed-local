FROM node:17-bullseye

# RUN apt-get install iputils-ping
# RUN apt-get install iptables
# RUN apt-get install gnupg
# RUN apt-get install wget
# RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
# RUN echo "deb arm64 https://repo.mongodb.org/apt/ubuntu bullseye/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
# RUN apt-get update
# RUN apt-get install -y mongodb-mongosh

WORKDIR ./
COPY package.json .
RUN npm install
COPY . .
CMD node ./src/oplog
EXPOSE 27017