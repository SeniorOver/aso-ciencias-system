FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

# Nombre
RUN npm run build audit-service

# Puerto
EXPOSE 3009

# Inicio
CMD ["node", "dist/apps/audit-service/main"]