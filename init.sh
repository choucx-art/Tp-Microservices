#!/bin/bash

echo "🚀 Initialisation du projet Microservices..."

# Étape 1 : Arrêt et nettoyage des containers, volumes, réseaux précédents
echo "🧹 Nettoyage des anciens containers et volumes..."
docker-compose down -v --remove-orphans

# Étape 2 : Reconstruction des images
echo "🔧 Reconstruction des images Docker..."
docker-compose build

# Étape 3 : Lancement de l'infrastructure
echo "📦 Lancement des services..."
docker-compose up -d

# Étape 4 : Affichage des logs groupés
echo "📊 Affichage des logs (Ctrl+C pour quitter)..."
docker-compose logs -f

