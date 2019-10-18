import {Component} from '@angular/core';

import {LoadingController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthentificationService, User} from './services/authentification.service';
import {Router} from '@angular/router';
import {InterfaceService} from './services/interface.service';
import {Storage} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm/ngx';
import {NotificationsService} from './providers/notifications.service';
import {AdminService, Billet} from './services/admin.service';
import {Observable} from 'rxjs';

@Component({
selector: 'app-root',
templateUrl: 'app.component.html'
})
export class AppComponent {
	user: User;
	newBillets: Observable<Billet[]>;
	public appPages = [
		{
			title: 'Activites',
			url: '/wei/activites',
			icon: 'clipboard',
			img: '../assets/img/pages/activites.png'
		}, {
			title: 'Actus',
			url: '/actualites',
			icon: 'paper',
			img: '../assets/img/pages/actus.png'
		}, {
			title: 'Olympiades',
			url: '/olympiades',
			icon: 'trophy',
			img: '../assets/img/pages/olympiades.png'
		}, {
			title: 'Infos',
			url: '/wei/informations',
			icon: 'information-circle',
			img: '../assets/img/pages/infos.png'
		}
	];

	constructor(
		private platform: Platform,
		public splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private _auth: AuthentificationService,
		private router: Router,
		private loadingCtrl: LoadingController,
		private interfaceService: InterfaceService,
		private storage: Storage,
		private fcm: FCM,
		private _notif: NotificationsService,
		private adminServ: AdminService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this._notif.getToken();
			this._notif.refreshToken();
			this._notif.onNotification();
			this.statusBar.styleDefault();
			this.statusBar.overlaysWebView(true);
			this.statusBar.show();
		});
		this.splashScreen.hide();
		this.newBillets = this.adminServ.getNewBillets();
	}

	logout() {
		this._auth.logout().then(
			() => {
				this.user = {pseudo: '', id: '', name: '', type: '', bungalow: '0', campus: '', appLaunch: false};
				this.router.navigateByUrl('/auth/login');
			},
		);
	}
	openBillet() {
		return new Promise((resolve, reject) => {
			this.interfaceService.alert('Es-tu sûr ?', '', 'Cette section est à prendre avec sérieux',[
				{
					text: 'Annuler',
					role: 'cancel',
					handler: () => {
						console.log('Annulée');
						reject();
					}
				}, {
					text: 'Sûr',
					handler: () => {
						this.router.navigateByUrl('/user/billet');
						resolve();
					}
				}
			]);
		});
	}
}
