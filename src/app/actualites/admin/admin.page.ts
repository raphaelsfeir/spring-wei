import { Component, OnInit } from '@angular/core';
import { Actu, ActuService } from '../../services/actu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

	actu: Actu = {
		titre: '',
		content: '',
		img: '',
		date: firebase.firestore.Timestamp.now(),
		order: 0
	};
	id: string;
	loadingSpinner: any;
	constructor(private activatedRoute: ActivatedRoute,
	            private actuService: ActuService,
	            private toastCtrl: ToastController,
	            private router: Router,
	            private camera: Camera,
	            public actionSheetController: ActionSheetController,
	            private loadingCtrl: LoadingController) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		if (this.id) {
			this.actuService.getActu(this.id).subscribe(actu => {
				this.actu = actu;
			});
		}
	}

	async upload() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Télécharger une photo',
			buttons: [{
				text: 'Utiliser la caméra',
				icon: 'camera',
				handler: () => {
					this.capture();
					console.log('Utiliser la caméra !');
				}
			}, {
				text: 'Choisir depuis l\'album photo',
				icon: 'albums',
				handler: () => {
					this.getFromLibrary();
					console.log('Choisir depuis la galerie');
				}
			}]
		});
		await actionSheet.present();
	}

	async getFromLibrary() {
		const options: CameraOptions = {
			quality: 74,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation: true,
			targetHeight: 720,
			targetWidth: 1280
		};

		let self = this;

		self.actu.img = await this.camera.getPicture(options).then(
			(data) => {
				this.actu.img = 'data:image/jpeg;base64,' + data;
				console.log('Dans promise : ' + this.actu.img);
				return this.actu.img;
			}, (error) => {
				alert('Erreur : ' + error);
				return error;
			}
		);
		console.log('Hors promise : ' + this.actu.img);
	}

	async capture() {
		const options: CameraOptions = {
			quality: 90,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			targetHeight: 720,
			targetWidth: 1280
		};

		let self = this;

		self.actu.img = await this.camera.getPicture(options).then(
			(data) => {
				this.actu.img = 'data:image/jpeg;base64,' + data;
				console.log('Dans promise : ' + this.actu.img);
				return this.actu.img;
			}, (error) => {
				alert('Erreur : ' + error);
				return error;
			}
		);
		console.log('Hors promise : ' + this.actu.img);
	}


	submit(f: NgForm) {
		this.actu = f.value;
		console.log('Validation : ' + this.actu.img);
		if (this.id) {
			this.loading("Mise à jour en cours...");
			this.actu.id = this.id;
			this.updateActu();
		} else {
			this.loading("Création de l'article...");
			this.actu.date = firebase.firestore.Timestamp.now();
			console.log(this.actu);
			this.addActu();
		}
	}

	addActu() {
		this.actuService.addActu(this.actu).then(
			() => {
				this.loadingSpinner.dismiss();
				this.router.navigateByUrl('/actualites');
				this.showToast('Article créé');
			}, err => {
				this.loadingSpinner.dismiss();
				this.showToast("Erreur lors de la création :( ");
			}
		);
	}
	deleteActu() {
		this.actuService.deleteActu(this.actu.id).then(
			() => {
				this.router.navigateByUrl('/actualites');
			}, err => {
				this.showToast("Erreur lors de la suppression");
			}
		);
	}
	updateActu() {
		this.actuService.updateActu(this.actu).then(
			() => {
				this.loadingSpinner.dismiss();
				this.showToast("Actualité mise à jour !");
				this.router.navigateByUrl('/actualites');
			}, err => {
				this.loadingSpinner.dismiss();
				this.showToast("Erreur lors de la modification");
			}
		);
	}
	showToast(msg) {
		this.toastCtrl.create({
			message: msg,
			duration: 2000
		}).then(toast => toast.present());
	}
	async loading(msg: string) {
		this.loadingSpinner = await this.loadingCtrl.create({
			message: msg,
			spinner: "crescent",
			translucent: true
		});
		this.loadingSpinner.present();
	}

}
