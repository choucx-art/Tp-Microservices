Voici un **README complet et cohérent** pour ton projet de microservices. Il explique l'architecture, la mise en place, les services, les outils de supervision, et les instructions d'exécution. Tu peux le placer à la racine de ton dépôt (`Tp-Microservices/README.md`).

---

### 📄 `README.md`

```markdown
# 🧩 Projet Microservices - Architecture Distribuée avec Monitoring

Ce projet met en œuvre une architecture microservices complète basée sur Node.js, MongoDB, Docker, RabbitMQ, Prometheus, Grafana, et Loki.

---

## ⚙️ Architecture du Projet

```

```
           ┌────────────┐
           │ API-Gateway│
           └────┬───────┘
                │
```

┌──────────────────┼────────────────────────────┐
│                  │                            │
▼                  ▼                            ▼
User-Service   Order-Service              Payment-Service
│              │                            │
└──────────────┴──────────────┐             │
▼             ▼
Notification-Service
▲
│
RabbitMQ (Bus)

```

---

## 📦 Microservices

| Service              | Port   | Description                           |
|----------------------|--------|---------------------------------------|
| API Gateway          | 3000   | Point d'entrée unique                 |
| User Service         | 3001   | Gestion des utilisateurs              |
| Order Service        | 3002   | Gestion des commandes                 |
| Payment Service      | 3003   | Traitement des paiements              |
| Notification Service | 3004   | Notifications via RabbitMQ            |
| MongoDB              | 27017  | Base de données partagée              |
| RabbitMQ             | 5672/15672 | File de messages + Interface web |
| Prometheus           | 9090   | Collecte de métriques                 |
| Grafana              | 3000   | Visualisation de métriques            |
| Loki                 | 3100   | Centralisation des logs               |

---

## 📁 Structure du projet

```

Tp-Microservices/
│
├── api-gateway/                 → Passerelle d'entrée
├── user-service/                → Microservice utilisateur
├── order-service/               → Microservice commandes
├── payment-service/             → Microservice paiements
├── notification-service/        → Notifications asynchrones
├── rabbitmq/                    → Définition des files et exchanges
├── monitoring/
│   ├── prometheus/              → Config Prometheus
│   ├── grafana/                 → Dashboards et datasources
│   └── loki/                    → Config Loki
├── .env.example                 → Variables d’environnement
├── docker-compose.yml          → Orchestration des services
└── init.sh                     → Script de démarrage

````

---

## 🚀 Mise en place du projet

### 1. Copier les variables d’environnement

```bash
cp .env.example .env
````

### 2. Lancer l'infrastructure

```bash
chmod +x init.sh
./init.sh
```

Cela effectue :

* un `docker-compose down -v` propre,
* une reconstruction des images,
* le démarrage complet avec `docker-compose up -d`,
* suivi des logs live.

---

## 📊 Monitoring & Observabilité

| Outil       | URL                                              | Identifiants par défaut |
| ----------- | ------------------------------------------------ | ----------------------- |
| Grafana     | [http://localhost:3000](http://localhost:3000)   | admin / admin           |
| Prometheus  | [http://localhost:9090](http://localhost:9090)   | -                       |
| RabbitMQ UI | [http://localhost:15672](http://localhost:15672) | admin / admin           |

* Dashboards Grafana : metrics de disponibilité des services
* Prometheus : scrute chaque service via `/metrics`
* Loki (optionnel) : collecte centralisée des logs applicatifs

---

## 📝 Fonctionnalités clés

* Architecture **modulaire** avec services découplés
* Communication **synchrones (REST)** et **asynchrones (RabbitMQ)**
* Supervision complète : **Prometheus**, **Grafana**, **Loki**
* **Dockerisé** pour une exécution simple et isolée
* Authentification JWT via l’API Gateway (optionnelle)

---

## 🛠️ À venir / Idées d'amélioration

* Intégration CI/CD avec GitHub Actions
* Instrumentation fine des services avec `/metrics`
* Ajout d’un service `frontend` (React, Vue, etc.)
* Envoi réel d’e-mails ou SMS via Notification Service

---

## 👨‍💻 Auteur

> Réalisé dans le cadre d’un TP d’architecture microservices avec supervision.
> Par : *Ton Nom / Étudiant en Génie Logiciel*

---

```

Souhaites-tu maintenant :
- que je te génère une **archive `.zip`** prête à télécharger avec tous les fichiers ?
- ou une **image illustrée de l'architecture** (type schéma technique) ?
```

