import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Bungalow {
	id?: string;
	emplacement: { lat: number, lng: number };
	locataires: string[];
	numero: string;
	responsable: string;
}

@Injectable({
	providedIn: 'root'
})
export class BungalowService {

	private bungalowCollection: AngularFirestoreCollection<Bungalow>;
	private bungalows: Observable<Bungalow[]>;


	constructor(private afs: AngularFirestore) {
		this.bungalowCollection = this.afs.collection('bungalow');
		this.bungalows = this.bungalowCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getBungalow(numero: string): Observable<Bungalow> {
		console.log('BUNGALOW] Récupération du bungalow n°', numero);
		return this.bungalowCollection.doc<Bungalow>('bungalow_' + numero).valueChanges().pipe(
			take(1),
			map(bungalow => {
				bungalow.numero = numero;
				console.log('[BUNGALOW] Bbungalow trouvé !', bungalow);
				return bungalow;
			})
		);
	}

	defResp(numero: string, respo: string) {
		return this.bungalowCollection.doc('bungalow_' + numero).update({ responsable: respo });
	}
}
