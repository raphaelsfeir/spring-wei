import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class InterfaceService {

	constructor(private alertCtrl: AlertController,
	            private loadingCtrl: LoadingController,
	            private toastCtrl: ToastController) {}


	async alert(titre: string, sousTitre: string, msg: string, btn: any[]) {
		const alert = await this.alertCtrl.create({
			header: titre,
			subHeader: sousTitre,
			message: msg,
			buttons: btn
		});

		await alert.present();
		return;
	}

	showToast(msg) {
		this.toastCtrl.create({
			message: msg,
			duration: 2000
		}).then(toast => toast.present());
	}

	stringToTime(s: string) {
		/* s = HH:mm:ss */
		const h = s.substring(0, 2);
		const m = s.substring(3, 5);
		const sec = s.substring(6, 8);
		return { heure: h, minutes: m, secondes: sec };
	}

}
