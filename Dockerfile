FROM node:carbon
# RUN apt-get update && apt-get install -y iputils-ping
RUN apt-get update && apt install -y ldap-utils

RUN mkdir -p /user/src/app

# Create app directory
WORKDIR /user/src/app

copy package.json ./

RUN npm install

# bundle app source
COPY . .

# create assets
RUN npm run prepare-server

EXPOSE 3000

cmd ["npm", "run", "production"]
