
# Eco Bliss Bath  
## Campagne de tests automatisés

![QA Automation](https://img.shields.io/badge/QA-Automation-blueviolet?style=for-the-badge)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=Google-Chrome&logoColor=white)
![Docs](https://img.shields.io/badge/docs-included-brightgreen?style=for-the-badge&logo=readthedocs&logoColor=white)

---

## 1. Présentation du projet

Cette campagne de tests a été réalisée dans le cadre du lancement de la version 1 du site e-commerce Eco Bliss Bath, spécialisé dans la vente de produits de beauté écoresponsables.

### Objectif du projet

- Automatiser les tests critiques pour garantir la fiabilité des fonctionnalités essentielles (connexion, panier).
- Renforcer la stratégie QA de l’entreprise.
- Détecter les anomalies dès les premières phases de développement.
- Assurer une expérience utilisateur fluide et sécurisée dès la mise en production.

---

## 2. Présentation de l’entreprise

**Eco Bliss Bath** est une jeune entreprise spécialisée dans la vente en ligne de **produits de beauté écoresponsables**, avec une mise en avant du **savon solide** comme produit principal.  
Le site e-commerce est en cours de développement et vise une mise en production rapide. Cette campagne de tests est essentielle pour garantir une expérience utilisateur fluide dès la V1.

---

## 3. Prérequis à l’installation

Avant de démarrer, vous devez avoir installé :

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (version recommandée : 18 ou supérieure)

---

## 4. Installation du projet

1. Clonez le projet :

```bash
git clone https://github.com/MarieC2023/automatisationTest.git
cd automatisationTest
```

2. Lancez les services avec Docker :

```bash
docker compose up -d
```

3. Une fois le projet lancé :
- L’interface du site est accessible à : [http://localhost:8080](http://localhost:8080)
- La documentation de l’API est disponible à : [http://localhost:8081/api/doc](http://localhost:8081/api/doc)

---

## 5. Lancer les tests Cypress

Pour exécuter les tests Cypress :

### Interface graphique (mode interactif) :

```bash
npx cypress open
```

> Choisissez un fichier de test à exécuter depuis l'interface Cypress.

### En ligne de commande (mode headless) :

```bash
npx cypress run
```

Les vidéos et captures d’écran sont générées automatiquement dans les dossiers `cypress/videos/` et `cypress/screenshots/`.

---

## 6. Structure des tests

```bash
cypress/
├── e2e/
│   ├── apiTests/          → Tests des endpoints API (authentification, panier, produits, avis)
│   ├── smokeTests/        → Tests de vérification rapide des éléments essentiels 
│   └── uiTests/           → Tests des interactions utilisateur (connexion, panier)
├── fixtures/              → Données de test 
├── services/              → Fichiers de requêtes API réutilisables
├── support/               → Fichiers de configuration et commandes personnalisées
└── selectors.js           → Centralisation des sélecteurs CSS
```

---

## 7. Génération des rapports de tests

Les rapports sont générés automatiquement sous forme de **captures d’écran** et de **vidéos** pour chaque test :

- **Captures d’écran :**  
  `cypress/screenshots/`

- **Vidéos :**  
  `cypress/videos/`

Aucune configuration supplémentaire n’est nécessaire.

Le projet contient également un dossier `docs/` avec :

- 📄 [`rapport_tests_manuels.pdf`](./rapport_tests_manuels.pdf) : Campagne de test manuel initiale (réalisée par Marie)
- 📄 [`rapport_tests_automatises.pdf`](./rapport_tests_automatises.pdf) : Bilan complet de la campagne de tests automatisés

> Ces documents servent de référence et permettent de suivre l’évolution du plan de test et les anomalies détectées.

---

## 8. Anomalies détectées

6 anomalies ont été identifiées lors de cette campagne de tests automatisés, dont :
- Ajout possible d’un produit en rupture de stock
- Absence de contrôle sur les quantités dans le panier (valeurs négatives et supérieures à 20)
- Fail XSS sur le formulaire d’avis
- Mauvaise utilisation des verbes HTTP dans l’API (ex. PUT au lieu de POST)

> Détail des anomalies dans le rapport [rapport_tests_automatises.pdf](./rapport_tests_automatises.pdf)

---

## 9. Environnement de test

- **Framework de test** : Cypress 14.3.0
- **Navigateur** : Chrome 135.0.7049.85
- **Système d’exploitation** : Windows 10
- **Environnement** : Local (via Docker)
- **Accès local** :  
  - Site : [http://localhost:8080](http://localhost:8080)  
  - API Swagger : [http://localhost:8081/api/doc](http://localhost:8081/api/doc)

---

📫 Pour toute question, merci de me contacter **Marie COLLET** via [LinkedIn](https://www.linkedin.com/in/marie-collet-2a0278220) ou directement sur GitHub **MarieC2023**.
