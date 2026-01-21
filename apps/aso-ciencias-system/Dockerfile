FROM node:18-alpine
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .

# OJO AQUÍ: El nombre es el de la carpeta raíz
RUN npm run build aso-ciencias-system 
EXPOSE 8080
CMD ["node", "dist/apps/aso-ciencias-system/main"]