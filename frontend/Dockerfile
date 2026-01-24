# ETAPA 1: Construcción (Build)
FROM node:18-alpine as build

WORKDIR /app

# Copiamos package.json
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código
COPY . .

# Construimos la app (En Vite esto crea la carpeta 'dist')
RUN npm run build

# ETAPA 2: Servidor Web (Nginx) para mostrar la página
FROM nginx:alpine

# Copiamos lo que construimos en la etapa anterior a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración necesaria para que React Router funcione (evita error 404 al recargar)
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
