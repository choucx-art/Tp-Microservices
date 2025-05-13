TP-MicroServices 

Ce TP a pour objectif la mise en œuvre d’une architecture distribuée reposant sur les microservices. Chaque microservice est responsable d’un domaine fonctionnel spécifique (utilisateurs, commandes, paiements, notifications), conteneurisé avec Docker, orchestré avec docker-compose, et communique soit de manière synchrone (HTTP REST), soit asynchrone (via RabbitMQ). Un API Gateway centralise les appels clients, applique la logique de routage, et gère l’authentification par JWT. Cette structure reflète une architecture orientée services moderne et modulaire.

L’infrastructure est supervisée avec Prometheus (métriques), Grafana (visualisation), et Loki pour la centralisation des logs. Des endpoints /health permettent de suivre l’état de chaque service. Une base de données (MongoDB ou PostgreSQL) est intégrée pour persister les données utilisateurs et commandes, avec des volumes Docker pour la durabilité. Chaque microservice expose également une documentation OpenAPI générée automatiquement via Swagger, améliorant la compréhension de l’API.

Une chaîne CI/CD complète est mise en place avec GitHub Actions, permettant le linting, les tests, et le déploiement automatisé des images Docker vers Docker Hub. Chaque commit déclenche un pipeline de build/test, renforçant la fiabilité du code. Des tests unitaires et d’intégration assurent la robustesse de chaque composant. Des outils comme jest, mocha ou pytest peuvent être utilisés selon les langages choisis (Node.js, Python, etc.).

L’objectif final de ce TP est d’acquérir des compétences complètes en architecture microservices, en DevOps, en supervision temps réel, et en bonnes pratiques professionnelles. Les étudiants apprendront à bâtir un système résilient, scalable, bien documenté, et conforme aux standards industriels modernes, le tout dans un environnement contrôlé et reproductible grâce à Docker et GitHub.


microservices-tp/
│
├── .github/
│   └── workflows/
│       └── ci.yml                     # Workflow GitHub Actions : test, build, push Docker
│
├── docker-compose.yml                # Orchestration complète (services + observabilité)
├── .env                              # Variables d’environnement globales
│
├── api-gateway/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── src/
│   │   ├── routes.js
│   │   └── authMiddleware.js         # JWT middleware
│   └── swagger.json
│
├── service-user/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── src/
│   │   ├── userController.js
│   │   └── db.js                     # Connexion MongoDB/PostgreSQL
│   ├── tests/
│   │   └── user.test.js
│   └── swagger.json
│
├── service-order/
│   └── ... (même structure que service-user)
├── service-payment/
│   └── ... (même structure que service-user)
├── service-notification/
│   └── ... (même structure que service-user)
│
├── prometheus/
│   └── prometheus.yml
├── grafana/
│   ├── dashboards/
│   │   └── main-dashboard.json
│   └── provisioning/
│       └── datasources.yml
│
├── loki/
│   └── loki-config.yml               # Centralisation des logs
├── logs/
│   └── promtail-config.yml          # Promtail pour envoyer les logs vers Loki
│
├── message-broker/
│   └── docker-compose.rabbitmq.yml
│
├── db/
│   ├── mongo/                        # Ou postgresql/
│   │   └── docker-compose.db.yml
│
└── README.md                         # Documentation complète du projet
