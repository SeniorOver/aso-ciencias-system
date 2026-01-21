FROM node:18-alpine

WORKDIR /usr/src/app

# Instalar CLI de Nest
RUN npm install -g @nestjs/cli

# Copiar archivos base
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# --- CAMBIO AQUÍ: Nombre de la nueva app ---
RUN npm run build invoice-service

# --- PUERTO ---
EXPOSE 3006

# --- ARRANQUE ---
CMD ["node", "dist/apps/invoice-service/main"]