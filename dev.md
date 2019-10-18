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
