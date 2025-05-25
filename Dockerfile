FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run lint
RUN npm run format
RUN npm run build
RUN echo "# Empty env file to satisfy build process" > .env

CMD ["sh", "-c", "npm run deploy && npm run start"]
