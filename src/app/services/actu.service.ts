import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { NotificationsService } from '../providers/notifications.service';
import { InterfaceService } from './interface.service';
import * as firebase from 'firebase/app';

export interface Actu {
	id?: string;
	titre: string;
	date: firebase.firestore.Timestamp;
	img: string;
	content: string;
	order: number;
}

@Injectable({
	providedIn: 'root'
})
export class ActuService {
	private actuCollection: AngularFirestoreCollection < any > ;
	messages = [];
	listeners = [];
	start = null;
	end = null;


	constructor(private afs: AngularFirestore,
	            private _noti: NotificationsService,
	            private inter: InterfaceService) {
			this.actuCollection = this.afs.collection(
				'actu',
				ref => ref.orderBy('date', 'desc')
			);
	}

	getActus(refresh?: boolean) {
		let ref = firebase.firestore().collection('actu');
		if (refresh) {
			this.listeners = [];
			this.messages = [];
			this.start = null;
			this.end = null;
		}
		return new Promise((resolve, reject) => {
			ref.orderBy('date', 'desc').limit(3).get().then((snap) => {
				this.start = snap.docs[snap.docs.length - 1];
				try {
					const loaded = ref.orderBy('date', 'desc').endAt(this.start)
						.onSnapshot((messages) => {
							messages.forEach((m) => {
								this.messages = this.messages.filter(x => x.id !== m.id);
								const data = m.data();
								const id = m.id;
								this.messages.push({id, ...data});
							});
							this.listeners.push(loaded);
							resolve();
						});
				} catch (e) {
					reject()
				}
			});
		});
	}
	getMoreActus() {
		const ref = firebase.firestore().collection('actu');
		return new Promise((resolve, reject) => {
			ref.orderBy('date', 'desc').startAfter(this.start).limit(3).get().then((snap) => {
				this.end = this.start;
				this.start = snap.docs[snap.docs.length - 1];
				try {
					const loaded = ref.orderBy('date', 'desc').startAfter(this.end).endAt(this.start)
						.onSnapshot((messages) => {
							messages.forEach((m) => {
								this.messages = this.messages.filter(x => x.id !== m.id);
								const data = m.data();
								const id = m.id;
								this.messages.push({id, ...data});
							});
							this.listeners.push(loaded);
							console.log(this.messages);
							resolve();
						});
				} catch (e) {
					reject('full');
				}
			});
		});
	}
	getActu(id: string): Observable < Actu > {
		return this.actuCollection.doc < Actu > (id).valueChanges().pipe(
			take(1),
			map(actu => {
				actu.id = id;
				return actu;
			})
		);
	}

	addActu(actu: Actu): Promise < DocumentReference > {
		this._noti.sendNotifications('actualites');
		return this.actuCollection.add(actu);
	}

	updateActu(actu: Actu): Promise < void > {
		return this.actuCollection.doc(actu.id).update({
			titre: actu.titre,
			content: actu.content,
			img: actu.img
		}).then(
			() => this._noti.sendNotifications('actualites', 'update')
		);
	}

	deleteActu(id: string): Promise < void > {
		return this.inter.alert(
			'Confirmer la suppression',
			'',
			'Souhaites-tu vraiment supprimer cet article ?',
			[{
				text: 'Annuler',
				role: 'cancel',
				handler: () => {
					console.log('Suppression annulée');
				}
			}, {
				text: 'Confirmer',
				handler: () => {
					console.log('Suppression confirmée');
					return this.actuCollection.doc(id).delete().then(
						() => this.inter.showToast('Article supprimé')
					).catch(
						() => this.inter.showToast('Erreur lors de la suppression')
					);
				}
			}]
		);
	}

}
