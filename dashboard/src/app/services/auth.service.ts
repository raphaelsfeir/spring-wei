import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {environment} from '../../environments/environment.prod';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {SystemService} from './system.service';

firebase.initializeApp(environment.firebase);

export interface User {
  id?: string;
  pseudo: string;
  name: string;
  type: string;
  bungalow: string;
  campus: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore,
              private router: Router,
              private snackBar: MatSnackBar,
              private _sys: SystemService) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  login(pseudo: string, pass: string, persistence: boolean) {
    const rememberMe = !!persistence;
    const email = pseudo + '@insa-cvl.fr';
    return new Promise((resolve, reject) => {
      if(rememberMe){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
          () => {
            firebase.auth().signInWithEmailAndPassword(email, pass).then(
              () => {
                this.initUser().then(
                  () => {
                    this.router.navigateByUrl('/');
                  }
                )
                resolve();
              }
            ).catch(
              (err) => {
                reject(err);
              }
            );
          }
        );
      } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
          () => {
            firebase.auth().signInWithEmailAndPassword(email, pass).then(
              () => {
                this.initUser().then(
                  () => {
                    this.router.navigateByUrl('/');
                  }
                );
                resolve();
              }
            ).catch(
              (err) => {
                reject(err);
              }
            );
          }
        );
      }

    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      window.location.replace('');
    });
  }

  getUser(id: string) {
    return this.usersCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user;
      })
    );
  }

  initUser() {
    const id = firebase.auth().currentUser.uid;
    if (id) {
      return new Promise((resolve) => {
        this.getUser(id).subscribe(user => {
          this.user = user;
          resolve();
        });
      });
    }
  }

  changePassword(nouveau: string) {
    let user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      user.updatePassword(nouveau).then(
        () => resolve()
      ).catch(
        (err) => reject(err)
      );
    });
  }

  setBungalow(uid: string, numero: string) {
    console.log('Mise à jour du bungalow dans la table utilisateur');
    this.usersCollection.doc(uid).update(
      {bungalow: +numero}
    ).then(
      () => console.log('Mise à jour utilisateur terminée')
    ).catch(
      (err) => console.error('Erreur lors de la mise à jour utilisateur : ' + err.code)
    );
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(
        () => {
          console.log('Mail envoyé !');
          resolve();
        }
      ).catch(
        err => reject(err.code)
      );
    });
  }

  checkCode(code: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().checkActionCode(code).then(
        () => {
          console.log('Token correct');
          resolve();
        }
      ).catch(
        (err) => {
          switch (err.code) {
            case 'auth/expires-action-code':
              reject("Le jeton d'utilisation a expiré ou a déjà été utilisé.");
              break;
            case 'auth/invalid-action-code':
              reject("Le jeton d'utilisation est incorrect ou a déjà été utilisé.");
              break;
            case 'auth/user-disabled':
              reject("Il semblerait que ton compte soit suspendu. Merci de contacter le BDE poru en savoir plus.");
              break;
            case 'auth/user-not-found':
              reject("Il semblerait que ton compte n'existe pas. Merci de t'inscrire au weekend avant d'utiliser le tableau de bord.");
              break;
            default:
              reject("Une erreur est survenue. Merci de contacter le BDE.");
          }
        }
      );
    });
  }

  confirmResetPassword(code: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().confirmPasswordReset(code, password).then(
        () => {
          console.log('Mot de passe changé !');
          resolve();
        }
      )
        .catch(
          (err) => {
            console.error(err);
            switch (err.code) {
              case 'auth/expires-action-code':
                reject("Le jeton d'utilisation a expiré ou a déjà été utilisé.");
                break;
              case 'auth/invalid-action-code':
                reject("Le jeton d'utilisation est incorrect ou a déjà été utilisé.");
                break;
              case 'auth/user-disabled':
                reject("Il semblerait que ton compte soit suspendu. Merci de contacter le BDE poru en savoir plus.");
                break;
              case 'auth/user-not-found':
                reject("Il semblerait que ton compte n'existe pas. Merci de t'inscrire au weekend avant d'utiliser le tableau de bord.");
                break;
              case 'auth/weak-password':
                reject("Ce mot de passe est trop court, il doit contenir au moins 6 caractères.");
                break;
              default:
                reject("Une erreur est survenue, merci de réessayer plus tard.");
            }
          }
        );
    });
  }
}
