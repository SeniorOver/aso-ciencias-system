FROM node:18-alpine
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .

# CAMBIO AQUÍ: Nombre de la app
RUN npm run build inventory-service 

# CAMBIO AQUÍ: Puerto
EXPOSE 3001 

# CAMBIO AQUÍ: Ruta del dist
CMD ["node", "dist/apps/inventory-service/main"]