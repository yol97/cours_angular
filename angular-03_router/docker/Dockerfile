# ============================
# ÉTAPE 1 : Build Angular
# ============================
FROM node:20-alpine AS build
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour installer les dépendances
COPY ../package*.json ./
RUN npm install

# Copie du reste du projet Angular
COPY ../ ./

# Build de l’application en mode production (par défaut)
RUN npm run build


# ============================
# ÉTAPE 2 : Serveur NGINX
# ============================
FROM nginx:1.27-alpine

# Copie de la configuration NGINX personnalisée
COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copie du build Angular depuis l’étape précédente
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/e-shop/browser ./

# Expose le port 80, pas obligatoire mais permet de documenter
EXPOSE 80

# Lancement du serveur NGINX, idem pas obligatoire car nginx le fait par défaut
CMD ["nginx", "-g", "daemon off;"]


# ============================
# ÉTAPE 3 : HEALTHCHECK
# ============================
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

