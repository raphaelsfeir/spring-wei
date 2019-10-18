<img src="https://github.com/raphaelsfeir/spring-wei/blob/master/src/assets/img/logo.png" width="250px">

Application SpringWEI - Tableau de bord
===========
Tableau de bord développé pour l'application SpringWEI. Il permet de gérer son bungalow et son compte depuis un navigateur web.

Repos en lien avec l'application
-----------
* Tableau de bord: [https://github.com/raphaelsfeir/spring-wei-dashboard](https://github.com/raphaelsfeir/spring-wei-dashboard)
* Application mobile: [https://github.com/raphaelsfeir/spring-wei](https://github.com/raphaelsfeir/spring-wei)
* API: [https://github.com/raphaelsfeir/spring-wei-api](https://github.com/raphaelsfeir/spring-wei-api)

Développer
--------------
#### Environnement nécessaire
- [Node.JS](https://nodejs.org)
- [Angular CLI](https://cli.angular.io/)
- [Firebase](https://firebase.google.com/) pour gérer la base de données

#### Installation
``` shell
git glone git@github.com:raphaelsfeir/spring-wei-dashboard.git
# ou
git clone https://github.com/raphaelsfeir/spring-wei-dashboard.git

cd spring-wei-dashboard
npm install
```

Ouvrir le fichier `src/environments/environments.ts` et insérer les informations de développement


#### Déployer en développement
Lancer `ng serve`. Le tableau de bord est lancé sur l'adresse `http://localhost:4200/`.

#### Build

Lancer `ng build` pour exporter le projet. Le résultat sera stocké dans le dossier `dist/`. En cas de déploiement pour la production, il faut rajouter le flag `--prod`.
