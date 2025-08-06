#!/bin/sh

# Script de démarrage pour Render

# Lancer les migrations de la base de données
# L'option --force est nécessaire pour l'exécution en production
echo "Running migrations..."
php artisan migrate --force

# Mettre en cache la configuration pour optimiser les performances
echo "Caching configuration..."
php artisan config:cache

# Mettre en cache les routes
echo "Caching routes..."
php artisan route:cache

# Démarrer Supervisor pour gérer Nginx et PHP-FPM
echo "Starting server..."
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
