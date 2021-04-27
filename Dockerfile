FROM node:14.16.1-alpine3.11 As development

LABEL maintainer="ahmedgrati1999@gmail.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build



FROM node:14.16.1-alpine3.11 as production

LABEL maintainer="ahmedgrati1999@gmail.com"
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .


COPY --from=development /usr/src/app/dist ./dist

ENTRYPOINT [ "npm","run","start:prod" ]