# Dockerfile final pour Laravel sur Render (approche mono-étape)
FROM php:8.2-fpm-alpine

# Installation des dépendances système (Nginx, Supervisor, etc.)
# On ajoute aussi shadow pour la gestion des utilisateurs si besoin, et bash pour le debug
RUN apk update && apk add --no-cache \
    nginx \
    supervisor \
    bash \
    git \
    curl \
    libzip-dev \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip

# Installation des extensions PHP
RUN docker-php-ext-install pdo pdo_mysql zip gd bcmath exif pcntl

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances Composer
# On le fait après avoir copié les fichiers pour profiter du cache Docker
RUN composer install --no-dev --optimize-autoloader

# Copier les configurations Nginx, Supervisor et PHP-FPM
COPY .docker/nginx.conf /etc/nginx/http.d/default.conf
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY .docker/php-fpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf

# Définir les permissions
# L'utilisateur www-data existe déjà dans cette image de base
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Rendre notre script de démarrage exécutable
RUN chmod +x ./render-start.sh

# Exposer le port 80
EXPOSE 80

# Définir le script de démarrage comme commande d'entrée
CMD ["./render-start.sh"]
