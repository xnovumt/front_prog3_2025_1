# --- Etapa 1: Construcción de la aplicación Angular ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
RUN npm install --force
COPY . .
RUN npm run build:production

# --- Etapa 2: Servir la aplicación construida con Nginx ---
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]