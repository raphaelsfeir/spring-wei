import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { NotificationsService } from '../providers/notifications.service';
import { AuthentificationService } from './authentification.service';
import { InterfaceService } from './interface.service';

export interface Billet {
	id ? : string;
	code: string;
	details: string;
	statut: string;
	utilisateur: string;
}
@Injectable({
	providedIn: 'root'
})
export class AdminService {

	billets: Observable < Billet[] > ;
	billetsNew: Observable < Billet[] > ;
	billetsCollection: AngularFirestoreCollection < Billet > ;
	billetsNewCollection: AngularFirestoreCollection < Billet > ;
	globals: Observable < any > ;

	constructor(private afs: AngularFirestore,
	            private _noti: NotificationsService,
	            private users: AuthentificationService,
	            private interfaceService: InterfaceService) {
		this.billetsCollection = this.afs.collection < Billet > (
			'admin/bde/tickets',
			ref => ref.where('statut', '>', 'Accompli')
		);
		this.billets = this.billetsCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
		this.billetsNewCollection = this.afs.collection(
			'admin/bde/tickets',
			ref => ref.where('statut', '==', 'Nouveau')
		);
		this.billetsNew = this.billetsNewCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);

		this.globals = this.afs.doc('admin/globals').valueChanges();

	}

	getBillets(): Observable < Billet[] > {
		return this.billets;
	}

	getNewBillets(): Observable < Billet[] > {
		return this.billetsNew;
	}
	getGlobals(): Observable < any > {
		return this.globals;
	}

	getBillet(id: string) {
		return this.billetsCollection.doc < Billet > (id).valueChanges().pipe(
			take(1),
			map(billet => {
				billet.id = id;
				return billet;
			})
		);
	}

	addBillet(billet: Billet) {
		return new Promise((resolve, reject) => {
			this.billetsCollection.doc(billet.id).update({
					code: billet.code,
					details: billet.details,
					statut: billet.statut,
					utilisateur: billet.utilisateur
				})
				.then(
					() => {
						console.log('Le document existe déjà !');
						this._noti.sendNotifications('billet', '', [billet.code, billet.utilisateur, billet.details]);
						reject('already-exists');
					}
				)
				.catch(
					() => {
						this.billetsCollection.doc(billet.id).set({
							code: billet.code,
							details: billet.details,
							statut: billet.statut,
							utilisateur: billet.utilisateur
						});
						this._noti.sendNotifications('billet', '', [billet.code, billet.utilisateur, billet.details]);
						resolve();
					}
				);
		});
	}

	updateBillet(billetId: string, status: string) {
		this.interfaceService.alert(
			'Confirmer',
			'',
			'Souhaites-tu vraiment changer le statut du billet ?',
			[{
				text: 'Non',
				role: 'cancel'
			}, {
				text: 'Oui',
				handler: () => {
					return this.billetsCollection.doc(billetId).update({
						statut: status,
					});
				}
			}]
		);
	}

	editGlobals(key: string, value: any) {
		return new Promise((res, reject) => {
			this.afs.collection('admin').doc('globals').update({
					[`${key}`]: value
				})
				.then(() => res())
				.catch(() => reject());
		});
	}
	billetInfo(billetId: string) {
		this.getBillet(billetId).subscribe(
			b => {
				console.log(billetId);
				console.log(b);
				this.interfaceService.alert(
					'Informations',
					'',
					'<strong>Utilisateur : </strong>' + b.utilisateur +
					'<br/><strong>Code : </strong>' + b.code +
					'<br/><strong>Détails : </strong>' + b.details +
					'<br/><strong>Statut : </strong><ion-badge>' + b.statut + '</ion-badge>',
					[{
						text: "S'en occuper",
						handler: () => {
							this.updateBillet(billetId, 'En cours');
						}
					}, {
						text: 'Problème réglé',
						cssClass: 'primary',
						handler: () => {
							this.updateBillet(billetId, 'Accompli');
						}
					}, {
						text: 'Annuler',
						role: 'cancel'
					}]
				);
			}
		);
	}


	// Utilisateurs
	getUsers() {
		return this.users.users;
	}

	filterUsers(recherche) {
		return this.users.getUsersList().pipe(
			map(users => users.filter(
				u => u.name.toLowerCase().indexOf(recherche.toLowerCase()) > -1
			))
		);
	}

	userInfo(userId: string) {
		this.users.getUser(userId).subscribe(
			u => {
				this.interfaceService.alert(
					u.name,
					'',
					'Pseudo : ' + u.pseudo +
					'<br/>Type : ' + u.type +
					'<br/>Campus: ' + u.campus,
					[{
						text: 'OK',
						role: 'cancel'
					}]
				);
			}
		);
	}

	open(key: string) {

	}
}
