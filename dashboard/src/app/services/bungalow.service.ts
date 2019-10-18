import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

export interface Bungalow {
  id?: string;
  emplacement: string;
  locataires: string[];
  numero: string;
  responsable: string;
  places: number;
}
@Injectable({
  providedIn: 'root'
})
export class BungalowService {

  bungalows: Observable<Bungalow[]>;
  bungalowCollection: AngularFirestoreCollection<Bungalow>;

  constructor(private afs: AngularFirestore,
              private _auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.bungalowCollection = afs.collection(
      'bungalow',
      ref => ref
        .orderBy('short', 'asc')
        .where('short', '>', 0)
        .where('short', '<', 800)
    );
    console.log(this.bungalowCollection);
    this.bungalows = this.bungalowCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getBungalow(numero: string): Observable<Bungalow> {
    return this.bungalowCollection.doc<Bungalow>('bungalow_' + numero).valueChanges().pipe(
      take(1),
      map(bungalow => {
        bungalow.numero = numero;
        return bungalow;
      })
    );
  }

  setResp(numero: string, resp: string) {
    const bungalow = this.getBungalow(numero);
    return new Promise((resolve, reject) => {
      bungalow.subscribe(
        (b) => {
          if (b.locataires.includes(resp)) {
            this.bungalowCollection.doc('bungalow_' + numero).update(
              {responsable: resp}
            ).then(
              () => resolve()
            ).catch(
              (err) => reject(err.code)
            );
          } else {
            reject('bungalow/resp-non-locataire');
          }
        }
      );
    });
  }

  addLocataire(uid: string, numero: string) {
    const bungalow = this.getBungalow(numero);
    this._auth.getUser(uid).subscribe(
      u => {
        const locataire = u.name;
        bungalow.subscribe(
          (b) => {
            if (b.locataires.length < b.places) {
              console.log('Ajout accepté !');
              b.locataires.push(locataire);
              this._auth.setBungalow(uid, numero);
              console.log('Mise à jour des locataires dans la table bungalow');
              this.bungalowCollection.doc('bungalow_' + numero).update(
                {
                  locataires: b.locataires
                }
              ).then(
                () => {
                  console.log('Mise à jour bungalow terminée !');
                  this._auth.initUser().then(
                    () => {
                      this.router.navigateByUrl('/');
                      this.snackBar.open('Tu as rejoins un bungalow 🎉 !')._dismissAfter(1200);
                    }
                  );
                }
              ).catch(
                (err) => console.error('Erreur lors de la mise à jour bungalow: ' + err.code)
              );
            }
          }
        );
      }
    );
  }

}
