# Wiki
## Sommaire
1. [Services nécessaires](#services)
2. [Structures](#structures)
3. [API](#api)

## [Services nécessaires](#services)
### Base de données
La base de données est stockée sur Firebase. Il vous faudra donc un compte pour y accéder. La structure est de cette forme: 
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

Les collections doivent être créées, les documents s'ajouteront d'eux-mêmes en suivant leur structure respctive !

### API
L'API doit être hébergée en ligne, cette année on est passé par Heroku. Pour le développement, un hébergement local suffit !
## [Structures](#structures)
###Activite
```json
id ? : string;
titre: string;
heure_debut: {};
heure_fin: {};
jour: string;
description: string;
```
###Actu
```json
id?: string;
titre: string;
date: firebase.firestore.Timestamp;
img: string;
content: string;
order: number;
```
###Billet
```json
id ? : string;
code: string;
details: string;
statut: string;
utilisateur: string;
```
###User
```json
id?: string;
pseudo: string;
name: string;
type: string;
bungalow: string;
campus: string;
appLaunch: boolean;
```
### Bungalow
```json
id?: string;
emplacement: { lat: number, lng: number };
locataires: string[];
numero: string;
responsable: string;
```
### Défi
```json
id ? : string;
titre: string;
points: number;
validation: string[];
```
### Famille
```json
nom: string;
points: number;
```
## [API](#api)
*(en rédaction...)*
