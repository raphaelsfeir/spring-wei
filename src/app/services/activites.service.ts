import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { InterfaceService } from './interface.service';
import { NotificationsService } from '../providers/notifications.service';

export interface Activite {
	id ? : string;
	titre: string;
	heure_debut: {};
	heure_fin: {};
	jour: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class ActivitesService {
	private activitesV: Observable < Activite[] > ;
	private activitesS: Observable < Activite[] > ;
	private activitesD: Observable < Activite[] > ;
	private activitesCollectionV: AngularFirestoreCollection < any > ;
	private activitesCollectionS: AngularFirestoreCollection < any > ;
	private activitesCollectionD: AngularFirestoreCollection < any > ;


	constructor(private afs: AngularFirestore, private inter: InterfaceService, private _notif: NotificationsService) {
		this.activitesCollectionV = this.afs.collection < Activite > (
			'activites',
			ref => ref.where('jour', '==', 'vendredi').orderBy('heure_debut')
		);
		this.activitesV = this.activitesCollectionV.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const Hdebut = this.inter.stringToTime(data.heure_debut);
					const Hfin = this.inter.stringToTime(data.heure_fin);
					data.heure_debut = Hdebut;
					data.heure_fin = Hfin;
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);

		this.activitesCollectionS = this.afs.collection < Activite > (
			'activites',
			ref => ref.where('jour', '==', 'samedi').orderBy('heure_debut')
		);
		this.activitesS = this.activitesCollectionS.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const Hdebut = this.inter.stringToTime(data.heure_debut);
					const Hfin = this.inter.stringToTime(data.heure_fin);
					data.heure_debut = Hdebut;
					data.heure_fin = Hfin;
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);

		this.activitesCollectionD = this.afs.collection < Activite > (
			'activites',
			ref => ref.where('jour', '==', 'dimanche').orderBy('heure_debut')
		);
		this.activitesD = this.activitesCollectionD.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const Hdebut = this.inter.stringToTime(data.heure_debut);
					const Hfin = this.inter.stringToTime(data.heure_fin);
					data.heure_debut = Hdebut;
					data.heure_fin = Hfin;
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getActivites(jour: string): Observable < Activite[] > {
		if (jour === 'vendredi') { return this.activitesV }
		if (jour === 'samedi') { return this.activitesS }
		if (jour === 'dimanche') { return this.activitesD }
	}

	getActivite(jour: string, id: string): Observable < Activite > {
		if (jour === 'vendredi') {
			return this.activitesCollectionV.doc < Activite > (id).valueChanges().pipe(
				take(1),
				map(actu => {
					actu.id = id;
					return actu;
				})
			);
		}
		if (jour === 'samedi') {
			return this.activitesCollectionS.doc < Activite > (id).valueChanges().pipe(
				take(1),
				map(actu => {
					actu.id = id;
					return actu;
				})
			);
		}
		if (jour === 'dimanche') {
			return this.activitesCollectionD.doc < Activite > (id).valueChanges().pipe(
				take(1),
				map(actu => {
					actu.id = id;
					return actu;
				})
			);
		}

	}

	addActivite(jour: string, activite: Activite): Promise < DocumentReference > {
		console.log(activite);
		return new Promise((resolve) => {
			if (jour === 'vendredi') {
				this.activitesCollectionV.add(activite).then((a) => {
					this._notif.sendNotifications('activites', '', [
						a.id,
						activite.titre,
						activite.jour,
						activite.heure_debut
					]);
				});
				resolve();
			}
			if (jour === 'samedi') {
				this.activitesCollectionS.add(activite).then((a) => {
					this._notif.sendNotifications('activites', '', [
						a.id,
						activite.titre,
						activite.jour,
						activite.heure_debut
					]);
				});
				resolve();
			}
			if (jour === 'dimanche') {
				this.activitesCollectionD.add(activite).then((a) => {
					this._notif.sendNotifications('activites', '', [
						a.id,
						activite.titre,
						activite.jour,
						activite.heure_debut
					]);
				});
				resolve();
			}
		});
	}

	updateActivite(jour: string, activite: Activite): Promise < void > {
		if (jour === 'vendredi') {
			return this.activitesCollectionV.doc(activite.id).update({
				titre: activite.titre,
				heure_debut: activite.heure_debut,
				heure_fin: activite.heure_fin,
				jour: activite.jour,
				description: activite.description
			}).then(
				() => this._notif.sendNotifications('activites-vendredi', 'update', [
					activite.id,
					activite.titre,
					activite.jour,
					activite.heure_debut
				]));
		}
		if (jour === 'samedi') {
			return this.activitesCollectionS.doc(activite.id).update({
				titre: activite.titre,
				heure_debut: activite.heure_debut,
				heure_fin: activite.heure_fin,
				jour: activite.jour,
				description: activite.description
			}).then(
				() => this._notif.sendNotifications('activites-samedi', 'update', [
					activite.id,
					activite.titre,
					activite.jour,
					activite.heure_debut
				]));
		}
		if (jour === 'dimanche') {
			return this.activitesCollectionD.doc(activite.id).update({
				titre: activite.titre,
				heure_debut: activite.heure_debut,
				heure_fin: activite.heure_fin,
				jour: activite.jour,
				description: activite.description
			}).then(
				() => this._notif.sendNotifications('activites-dimanche', 'update', [
					activite.id,
					activite.titre,
					activite.jour,
					activite.heure_debut
				]));
		}
	}

	deleteActivite(jour: string, id: string): Promise < void > {
		return new Promise(
			(resolve, reject) => {
				this.inter.alert(
					'Supprimer ?',
					'',
					'Souhaites-tu vraiment supprimer cette activité ?',
					[{
						text: 'Annuler',
						role: 'cancel',
						handler: () => {
							reject();
							console.log('Suppression annulée');
						}
					}, {
						text: 'Supprimer',
						handler: () => {
							console.log('Suppression');
							this._notif.deleteReminder([id]);
							if (jour === 'vendredi') {
								return this.activitesCollectionV.doc(id).delete().then(
									() => resolve()
								);
							}
							if (jour === 'samedi') {
								return this.activitesCollectionS.doc(id).delete().then(
									() => resolve()
								);
							}
							if (jour === 'dimanche') {
								return this.activitesCollectionD.doc(id).delete().then(
									() => resolve()
								);
							}

						}
					}]
				);
			}
		);
	}

}
