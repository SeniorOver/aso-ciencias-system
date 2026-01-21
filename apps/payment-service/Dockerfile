FROM node:18-alpine

WORKDIR /usr/src/app

# Instalar CLI de Nest para poder compilar
RUN npm install -g @nestjs/cli

# Copiar archivos de configuración del Monorepo
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# --- CAMBIO IMPORTANTE: Nombre de la app ---
RUN npm run build payment-service

# --- CAMBIO IMPORTANTE: Puerto ---
EXPOSE 3005

# --- CAMBIO IMPORTANTE: Ruta de inicio ---
CMD ["node", "dist/apps/payment-service/main"]