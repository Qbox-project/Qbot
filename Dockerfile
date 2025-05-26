FROM node:20-alpine AS base

WORKDIR /app

FROM base AS deps

COPY . .
RUN npm ci --production

FROM deps AS build

RUN npm ci --production=false
RUN npm run build

FROM base AS final

COPY package.json .

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]
