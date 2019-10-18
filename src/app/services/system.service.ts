import { Injectable } from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {User} from './authentification.service';
import CryptoJS from 'crypto-js';
import {Storage} from '@ionic/storage';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SystemService {

	DASHBOARD_LINK = environment.links.dashboard;
	WEI_LINK = environment.links.website;
	CAMPUS_LINK = environment.links.campus;

	constructor(private iap: InAppBrowser,
				private callNumber: CallNumber,
				private appVersion: AppVersion,
	            private storage: Storage) {
		if (this.DASHBOARD_LINK === 'http://localhost:4200') {
			console.warn('URL du tableau de bord locale ! Penser à lancer l\'application web.');
		} else if(this.DASHBOARD_LINK === '') {
			console.warn('URL du tableau de bord non initialisée !')
		}
	}

	goTo(url: string) {
		console.log(url);
		this.iap.create(url, '_system', {});
	}
	call(numero: string) {
		this.callNumber.callNumber(numero, false)
			.then(res => console.log('Choix du lanceur ' + res))
			.catch(err => console.log(err));
	}
	getVersion() {
		return this.appVersion.getVersionNumber();
	}

	// Mémoire
	getMem(champ: string) {
		return this.storage.get(champ);
	}
	cleanMem() {
		this.storage.clear();
	}
	setMem(user: User) {
		this.storage.set('rememberMe', 'true');
		this.storage.set('user', user).then(async () => {
			const t = await this.createToken();
			console.log('[STORAGE] Création du token: ', t);
			this.storage.set('token', t);
		});
	}
	updateMem(champ: string, value: any) {
		this.storage.remove(champ).then(() => {
			this.storage.set(champ, value);
		});
	}
	createToken() {
		return new Promise((res) => {
			this.getMem('user').then(u => {
					console.log('[STORAGE] Utilisateur pour le token: ', u);
					const t = CryptoJS.SHA256('#id#' + u.id + '$^' + u.pseudo + '^$').toString(CryptoJS.enc.Hex);
					console.log('[STORAGE] Token: ', t);
					res(t);
				})
				.catch(() => {
					throw new Error('Le champ user n\'existe pas. Création du token impossible');
				});
		});
	}
	checkToken() {
		return new Promise((res, reject) => {
			console.log('[SECURITE] Vérification du token');
			this.getMem('token').then(async t => {
				if (t) {
					const tmp = await this.createToken();
					if (t === tmp) {
						console.log('[SECURITE] Token correct');
						res();
					} else {
						console.log(t, ' != ', tmp);
						console.log('[SECURITE] Token incorrect');
						reject();
					}
				} else {
					console.log('[SECURITE] Token indéfini ou nul:', t);
					reject();
				}
			})
				.catch(() => {
					console.log('[SECURITE] Le champ token n\'existe pas');
					reject();
				});
		});
	}
}
