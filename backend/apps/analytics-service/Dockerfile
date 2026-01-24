FROM node:18-alpine
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .

# CAMBIO AQUÍ
RUN npm run build analytics-service 
EXPOSE 3004
CMD ["node", "dist/apps/analytics-service/main"]