FROM node:lts-slim as base

WORKDIR /src

# Install openSSL for Prisma
RUN apt-get update -y 
RUN apt-get install -y openssl

# Build
FROM base as build

COPY package*.json ./

RUN npm ci --verbose

COPY . .

RUN npm run prisma:generate:sql
RUN npm run build
RUN npm prune

# Run
FROM base

COPY --from=build /src/.output /src/.output
COPY --from=build /src/prisma /src/prisma

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]