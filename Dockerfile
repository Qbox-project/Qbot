FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run lint
RUN npm run format
RUN npm run build
RUN npm run deploy

CMD ["npm", "run", "start"]
