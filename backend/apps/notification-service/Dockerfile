FROM node:18-alpine
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .

# CAMBIO AQUÍ
RUN npm run build notification-service 
EXPOSE 3003
CMD ["node", "dist/apps/notification-service/main"]