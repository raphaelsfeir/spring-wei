import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { NotificationsService } from '../providers/notifications.service';

export interface Defi {
	id ? : string;
	titre: string;
	points: number;
	validation: string[];
}

export interface Famille {
	nom: string;
	points: number;
}

@Injectable({
	providedIn: 'root'
})
export class OlympiadesService {
	private defis: Observable < Defi[] > ;
	private defisCollection: AngularFirestoreCollection < Defi > ;
	private familles: Observable < Famille[] > ;
	private famillesCollection: AngularFirestoreCollection < Famille > ;


	constructor(private afs: AngularFirestore, private _notif: NotificationsService) {
		this.defisCollection = this.afs.collection < Defi > ('defis');
		this.defis = this.defisCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);

		this.famillesCollection = this.afs.collection < Famille > ('familles');
		this.familles = this.famillesCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getDefis(): Observable < Defi[] > {
		return this.defis;
	}
	getFamilles(): Observable < Famille[] > {
		return this.familles;
	}

	valide(famille: string, defi: Defi): boolean {
		return defi.validation.includes(famille);
	}
	initValidation(f: NgForm) {
		const final = [];
		if (f.value.Krakens === true) { final.push("Krakens"); }
		if (f.value.Minotaures === true) { final.push("Minotaures"); }
		if (f.value.Phoenix === true) { final.push("Phoenix"); }
		if (f.value.Sphinx === true) { final.push("Sphinx"); }
		if (f.value.Cerbères === true) { final.push("Cerbères"); }
		return final;
	}

	getDefi(id: string): Observable < Defi > {
		return this.defisCollection.doc < Defi > (id).valueChanges().pipe(
			take(1),
			map(actu => {
				actu.id = id;
				return actu;
			})
		);
	}

	addDefi(f: NgForm): Promise < DocumentReference > {
		const validationf = this.initValidation(f);
		const defi = {
			titre: f.value.titre,
			points: f.value.points,
			validation: validationf
		};
		this._notif.sendNotifications('defis');
		return this.defisCollection.add(defi);
	}

	updateDefi(f: NgForm, id: string): Promise < void > {
		const validationf = this.initValidation(f);
		return this.defisCollection.doc(id).update({
			titre: f.value.titre,
			points: f.value.points,
			validation: validationf
		}).then(
			() => this._notif.sendNotifications('defis', 'update')
		);
	}

	deleteDefi(id: string): Promise < void > {
		return this.defisCollection.doc(id).delete();
	}

}
