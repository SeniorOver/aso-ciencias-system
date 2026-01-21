FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

# Nombre
RUN npm run build review-service

# Puerto
EXPOSE 3007

# Inicio
CMD ["node", "dist/apps/review-service/main"]