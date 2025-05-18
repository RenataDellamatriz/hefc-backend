FROM node:18-alpine

RUN apk add --no-cache git openssh
RUN npm i -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Enable `pnpm add --global` on Alpine Linux by setting
# home location environment variable to a location already in $PATH
# https://github.com/pnpm/pnpm/issues/784#issuecomment-1518582235
ENV PNPM_HOME=/usr/local/bin

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

# app infra repo
WORKDIR /home/node/app
USER node
COPY package.json .npmrc ./
RUN pnpm install
COPY --chown=node:node . ./
RUN pnpm run build

EXPOSE 8080
CMD PORT=8080 npm start
