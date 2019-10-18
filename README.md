<img src="https://github.com/raphaelsfeir/spring-wei/blob/master/src/assets/img/logo.png" width="250px">

Application SpringWEI
===========
Application réalisée dans le cadre du week-end d'intégration SpringWEI 2019 de l'INSA Centre Val de Loire.

Repos en lien avec l'application
-----------
* Tableau de bord: [https://github.com/raphaelsfeir/spring-wei-dashboard](https://github.com/raphaelsfeir/spring-wei-dashboard)
* Application mobile: [https://github.com/raphaelsfeir/spring-wei](https://github.com/raphaelsfeir/spring-wei)
* API: [https://github.com/raphaelsfeir/spring-wei-api](https://github.com/raphaelsfeir/spring-wei-api)

Informations sur l'application
-----------
* Framework utilisé : Ionic 4
* Compatibilité : Android et iOS
* Autorisations nécessaires : Accès à la caméra, au stockage et aux notifications
* Développeur : Raphaël Sfeir
* Merci à Alain Dufour de l'UTT pour son aide et ses conseils sur l'application

Développer
--------------
#### Environnement nécessaire
- [Node.JS](https://nodejs.org)
- [Ionic 4](https://ionicframework.com/getting-started)
- [Android Studio](https://developer.android.com/studio) pour compilation sur Android
- [XCode](https://developer.apple.com/xcode/) pour compilation sur iOS (il vous faudra un mac - les VM fonctionnent également)
- [Firebase](https://firebase.google.com/) pour gérer la base de données

#### Installation
``` shell
git glone git@github.com:raphaelsfeir/spring-wei.git
# ou
git clone https://github.com/raphaelsfeir/spring-wei.git

cd spring-wei
npm install
```

Ouvrir le fichier `src/environments/environments.ts` et insérer les informations de développement

##### Structure de Firebase
La base de données doit contenir les collection suivantes : 
```
| activites
| actu
| admin
    | bde
        | tickets
    | globals
        activiteAccess: boolean
        actuAccess: boolean
        challengeAccess: boolean
        mapAccess: boolean
| bungalow
| defis
| familles
    | Un document par famille avec un champ Nom: string
| users
```

Toutes les informations sont disponibles dans le fichier [WIKI.md](https://github.com/raphaelsfeir/spring-wei/blob/master/wiki.md)

#### Tester l'application
```shell
ionic serve                                             # Lancer l'application localement
ionic run [ios/android]                                 # Lancer l'application sur le device
ionic cordova build [ios/android] --[release/debug]     # Compiler sur ios ou android
```

#### Mettre à jour l'application
Pour mettre à jour l'application, voici les étapes à suivre :
##### Augmenter le numéro de version
Ouvrir le fichier `config.xml` et incrémenter l'attribut `version='x.y.z'`
- `x` correspond à une mise à jour majeure : Restructuration totale de l'appli, nouvelle édition du WEI
- `y` correspond à la mise à jour à effectuer : Ajout d'une fonctionnalité importante
- `z` correspond à une mise à jour mineure : Ajustements, changement de style

Dès que `x` ou `y` est incrémentée, la valeur suivante est réinitialisée à 0 !
##### Compiler l'application
```shell
ionic cordova build [ios/android] --[release/debug]     # Compiler sur ios ou android
```
##### Envoyer la mise à jour
###### Google:
- Compiler un AAB **signé** avec la clé SpringWEI (utiliser Android Studio)
- Se connecter sur la [console Google Play](https://play.google.com/apps/publish/)
- Envoyer le fichier AAB comme dernière version
- La validation peut durer 24h - 48h

###### Apple
- Remplacer "com.campus_cvl.springwei" par "com.campus-cvl.springwei" dans le fichier `config.xml`
- lancer `ionic cordova build ios`
- Ouvrir le fichier `platforms/ios/SpringWei.xcworkspace`
- Vérifier la version dans XCode ainsi que les profils
- Produire l'archive et la distribuer sur l'App Store
- La validation peut durer 24-48h **en semaine**

Changelog (⩾ v1.2.0)
---------
*NB: Pour les versions précédentes, regarder le fichier CHANGELOG.txt*

**v1.2.16: Corrections**

[CORRECTIONS]:
- Ajout de problèmes signalés

****************************************************
**v1.2.14: Corrections**

[CORRECTIONS]:
- Correction de l'heure des activités (format)

****************************************************
**v1.2.13: Corrections**

[CORRECTIONS]:
- Correction du chargement d'actualités (afficher plus)

****************************************************
**v1.2.12: Corrections**

[CORRECTIONS]:
- Crédits à la page d'informations

****************************************************
**v1.2.11: iOS**

[CORRECTIONS]:
- Modification pour iOS seulement

****************************************************
**v1.2.10: Corrections**

[CORRECTIONS]:
- Correction du chargement d'actualités en cas de 0 actualités

****************************************************
**v1.2.9: Corrections**

[CORRECTIONS]:
- Correction de la page d'actualité single
- Correction de la date de publication
- Correction de la page Bungalow en cas de bungalow 0

****************************************************
**v1.2.8: Amélioration du chargement**

[CORRECTIONS]:
- Amélioration du chargement des actualités
- Suppression de la famille de l'utilisateur
- Importation des packages nécessaires à Firebase seulement
- Correction du bug de chargement infini de la map

****************************************************
**v1.2.7: Corrections graphiques**

[CORRECTIONS]:
- Corrections de bugs graphiques

****************************************************
**v1.2.6: Ajustements pour cross-platform**

[CORRECTIONS]:
- Utilisation du stockage natif à la place du stockage local *(ie: utilisation de Ionic Storage)*

****************************************************
**v1.2.5: Ajustements**

[CORRECTIONS]:
- Amélioration de la page `login`
    - Développement du jeu de couleurs
    - Développement du contrôle des identifiants
    - Changement du logo
- Compression des images envoyées sur les actualités
- Suppression de CodePush dans les fichiers natifs
- Correction du bug de hauteur pour les actualités

****************************************************
**v1.2.4: Interface admin**
- Ajout d'une interface `Bureau Restreint`
    - Permet d'ouvrir l'accès à : **la carte**, **les actus**, **les activités**, **les défis**

[CORRECTIONS]:
- Restructuration de la base de données
    * `/billets` -> `/admin/bde/tickets`
    * Création de `/admin/globals` pour gérer les paramètres globaux de l'application pour administrateurs (ex : accès à la carte)
- Mise en place de la fonctionnalité `swipe` pour les tabs

****************************************************
**v1.2.3: Amélioration de la carte**
- Changement du fond de carte de camping
    - 2 versions : vierge (uniquement les emplacements) et détaillée

[CORRECTIONS]:
- Le numéro du bungalow est maintenant un `string` (gestion des XX B)
****************************************************
**v1.2.2 : Notifications plannifiées**
- Mise en place d'une API REST de planification pour les notifications


****************************************************
**v1.2.1 : Connexion améliorée**
- Amélioration de la connexion stockée
    - Stockage local : *rememberMe*, *user*, *token*

[CORRECTIONS] :
- Ré-ajustement de toute la fonction `login()`
- Stockage dynamique : les champs variables de `User` sont: **bungalow** et **type** (période de test uniquement)
    - Ré-allocation de la mémoire si l'utilisateur accède à la page *bungalow* avec un bungalow différent de celui enregistré

****************************************************

**v1.2.0 : Amélioration de l'UX**
- Restructuration de l'interface User : ajout d'un champ `appLaunch` pour détecter le premier lancement de l'appli
    * Si `!appLaunch` => On affiche un écran d'accueil pour présenter l'appli
    * Sinon, on masque l'écran d'accueil
- Ajout d'une aide lors de la connexion

[CORRECTIONS] :
- Suppression de CodePush, cause : génération de bugs au démarrage
- Mise en style du message d'erreur

****************************************************
