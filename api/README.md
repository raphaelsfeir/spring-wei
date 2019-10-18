<img src="https://github.com/raphaelsfeir/spring-wei/blob/master/src/assets/img/logo.png" width="250px">

Application SpringWEI - API
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
- [Sendgrid](https://sendgrid.com) pour gérer l'envoi de mails

#### Installation
``` shell
git glone git@github.com:raphaelsfeir/spring-wei-api.git
# ou
git clone https://github.com/raphaelsfeir/spring-wei-api.git

cd spring-wei-api
npm install
```

Ouvrir le fichier `src/environments/environments.ts` et insérer les informations de développement


#### Déployer en développement
Lancer `npm start`. Le tableau de bord est lancé sur l'adresse affichée dans le terminal (en général `http://localhost:3000`)

#### Héberger
Cette année nous avons utilisé Heroku pour déployer l'API

API Endpoints
--------------
| **Type** | **Endpoints**         | **Options**                                                                                                               | **Descriptions**                                                                                      |
|----------|-----------------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `POST`   | `/sendmail`           |  <code>{<br>"email":"xxx" (string),<br> "prenom": "xxx" (string),<br> "pseudo": "xxx" (string),<br> "password": "xxx" (string)<br> }</code> | `Envoi du mail d'inscription avec les informations passées en options`                                |
| `POST`   | `/notifications`      |  <code>{<br> "id": "xxx" (string),<br> "titre": "xxx" (string),<br> "jour": x (int),<br> "heure": x (int),<br> "minute": xxx (int)<br> }</code>   | `Prépare la notification identifiée par {id}. Elle sera envoyée {jour} à {heure}h{minute - DELAI=10}` |
| `DELETE` | `/notifications/{id}` |                                                                                                                           | `Supprime la notification identifiée par {id} en la supprimant des plannifications`                   |
| `GET`    | `notifications`       |                                                                                                                           | `Retourne les notifications qui sont planifiées`                                                      |
