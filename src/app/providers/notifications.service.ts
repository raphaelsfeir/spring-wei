import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { InterfaceService } from '../services/interface.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface Device {
	id ? : string,
	token: string
}

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {

	private devices: Observable < Device[] > ;
	private deviceCollection: AngularFirestoreCollection < any > ;

	constructor(private fcm: FCM,
	            private afs: AngularFirestore,
	            private router: Router,
	            private _interface: InterfaceService,
	            private _http: HttpClient) {

		this.deviceCollection = this.afs.collection < Device > (
			'devices'
		);
		this.devices = this.deviceCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const token = a.payload.doc.id;
					return { token, ...data };
				});
			})
		);
	}

	getToken() {
		let device: Device;
		this.fcm.getToken().then(token => {
			console.log(token);
			//this.deviceCollection.add({token: token}).then(() => console.log('Token ajouté !'));
		});
	}

	refreshToken() {
		this.fcm.onTokenRefresh().subscribe(token => {
			console.log('TOKEN RESFRESH : ' + token);
			//this.deviceCollection.add({token: token}).then(() => console.log('Token ajouté !'));
		});
	}

	onNotification() {
		this.fcm.onNotification().subscribe((data) => {
			console.log(data);
			if (data.wasTapped) {
				console.log('Notification reçue en arrière-plan');
				this.router.navigateByUrl(data.landing_page);
			} else {
				console.log('Notification reçue avec l\'application ouverte');
				this._interface.showToast(data.title);
			}
		});
	}

	sendNotifications(type: string, subject ? : string, content ? : any[]) {
		let headersOptions = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'key=' + environment.API.notificationAuth
		});

		const httpOption = {
			headers: headersOptions,
		};


		let postData: any;
		if (!subject) {
			if (type === 'actualites') {
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Une nouvelle actualité vient d'être publiée !",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=actualites",
						"title": "Une actualité vient d'être publiée !"
					},
					"to": "/topics/actualites",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'defis') {
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Un nouveau défi vient d'être publié !",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=olympiades",
						"title": "Un nouveau défi vient d'être publié !"
					},
					"to": "/topics/defis",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'activites') {
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Une nouvelle activité vient d'être publiée !",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=wei/activites",
						"title": "Une nouvelle activité vient d'être publiée !"
					},
					"to": "/topics/activites",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'billet') {
				postData = {
					"notification": {
						"title": "SpringWEI - Admin",
						"body": content[1] + " a signalé: " + content[2],
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=admin",
						"title": "Un problème a été signalé, merci de lire billet correspondant"
					},
					"to": "/topics/admin",
					"priority": "high",
					"restricted_package_name": ""
				};
			}
		} else if (subject === 'update') {
			console.log('Notification de mise à jour');
			if (type === 'actualites') {
				console.log('Notification de mise à jour actu');
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Une actualité vient d'être modifiée",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=actualites",
						"title": "Modification d'une actualité"
					},
					"to": "/topics/updatesActualites",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'defis') {
				console.log('Notification de mise à jour défi');
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Un défi vient d'être modifié",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=olympiades",
						"title": "Modification d'un défi"
					},
					"to": "/topics/updatesDefis",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'activites-vendredi') {
				console.log('Notification de mise à jour activité');
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Une activité de Vendredi vient d'être modifiée",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=wei/activites/tabs/vendredi",
						"title": "Modification d'une activité"
					},
					"to": "/topics/updatesActivites",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'activites-samedi') {
				console.log('Notification de mise à jour activité');
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Une activité de Samedi vient d'être modifiée",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=wei/activites/tabs/samedi",
						"title": "Modification d'une activité"
					},
					"to": "/topics/updatesActivites",
					"priority": "high",
					"restricted_package_name": ""
				};
			} else if (type === 'activites-dimanche') {
				console.log('Notification de mise à jour activité');
				postData = {
					"notification": {
						"title": "SpringWEI",
						"body": "Une activité de Dimanche vient d'être modifiée",
						"sound": "default",
						"click_action": "FCM_PLUGIN_ACTIVITY",
						"icon": "fcm_push_icon"
					},
					"data": {
						"landing_page": "/auth/login?open=wei/activites/tabs/dimanche",
						"title": "Modification d'une activité"
					},
					"to": "/topics/updatesActivites",
					"priority": "high",
					"restricted_package_name": ""
				};
			}
		}

		this._http.post('https://fcm.googleapis.com/fcm/send', postData, httpOption)
			.subscribe(
				() => { console.log('Envoi en cours...'); },
				(error) => { console.log('Erreur : ' + error); },
				() => {
					console.log(postData);
					if (!subject) {
						if (type === 'activites') {
							this.sendReminder(content).then(
								() => console.log('Notification planifiée !')
							);
						}
					} else {
						if (type === 'activites-vendredi' || type === 'activites-samedi' || type === 'activites-dimanche') {
							console.log('Plannfications : ');
							this.deleteReminder(content).then(
								() => {
									console.log('Planification supprimée');
									this.sendReminder(content).then(
										() => console.log('Plannification envoyée !')
									);
								}
								)
								.catch(
									() => {
										console.log('Planification déjà supprimée');
										this.sendReminder(content).then(
											() => console.log('Plannification envoyée !')
										);
									}
								);
						}
					}
				}
			);
	}

	sendReminder(content: string[]) {
		const toDay = (str) => {
			switch (str) {
				case 'vendredi':
					return 5;
					break;
				case 'samedi':
					return 6;
					break;
				case 'dimanche':
					return 0;
					break;
			}
		};
		const time = (str) => {
			const sep = str.indexOf(':');
			return [str.substring(0, sep), str.substring(sep + 1)];
		};
		const data = {
			"id": content[0],
			"titre": content[1],
			"jour": toDay(content[2]),
			"heure": time(content[3])[0],
			"minute": time(content[3])[1]
		};
		console.log(data);
		let headersOptions = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		const httpOption = {
			headers: headersOptions,
		};
		return new Promise((res, reject) => {
			const req = new HttpRequest('POST', environment.API.url + '/notifications', data, httpOption);
			this._http.request(req).toPromise().then(
				() => res()
			);
		});
	}
	deleteReminder(content: string[]) {
		const data = {
			"id": content[0]
		};
		let headersOptions = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		const httpOption = {
			headers: headersOptions,
		};
		return new Promise((res, reject) => {
			const req = new HttpRequest('POST', environment.API.url + '/notificationsDel', data, httpOption)
			this._http.request(req).toPromise().then(
				() => res()
				)
				.catch(() => res());
		});
	}

}
