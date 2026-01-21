# 1. IMAGEN BASE: Usamos Node.js versión 18 en una versión ligera (Alpine)
FROM node:18-alpine

# 2. DIRECTORIO DE TRABAJO: Creamos una carpeta dentro del contenedor
WORKDIR /usr/src/app

# 3. INSTALAR DEPENDENCIAS GLOBALES (Nest CLI)
RUN npm install -g @nestjs/cli

# 4. COPIAR ARCHIVOS DE CONFIGURACIÓN DEL MONOREPO
# (Necesitamos el package.json raíz y el de nest-cli para que entienda la estructura)
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# 5. INSTALAR LIBRERÍAS
RUN npm install

# 6. COPIAR EL CÓDIGO FUENTE
# Copiamos TODO (apps, libs, etc)
COPY . .

# 7. CONSTRUIR LA APP ESPECÍFICA (Auth Service)
RUN npm run build auth-service

# 8. EXPONER EL PUERTO (El 3000 es el de Auth)
EXPOSE 3000

# 9. COMANDO DE INICIO
# Cuando el contenedor arranque, ejecuta el código compilado (dist)
CMD ["node", "dist/apps/auth-service/main"]