# Dockerfile pour une application Laravel sur Render

# Étape 1: Base PHP et dépendances
FROM php:8.2-fpm as builder

# Arguments pour l'utilisateur non-root
ARG UID=1000
ARG GID=1000

# Dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    supervisor

# Extensions PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Répertoire de travail
WORKDIR /var/www

# Copie des dépendances Composer
COPY composer.json composer.lock ./

# Installation des dépendances (production)
RUN composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader

# Copie du reste de l'application
COPY . .

# Permissions
RUN chown -R www-data:www-data /var/www

# Étape 2: Image finale avec Nginx
FROM nginx:alpine

# Copie des fichiers de l'application depuis l'étape de build
COPY --from=builder /var/www /var/www

# Copie de la configuration Nginx et Supervisor
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Créer l'utilisateur et le groupe www-data
RUN addgroup -S www-data && adduser -S -G www-data www-data

# Permissions pour le stockage et le cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Exposer le port 80
EXPOSE 80

# Commande de démarrage
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
