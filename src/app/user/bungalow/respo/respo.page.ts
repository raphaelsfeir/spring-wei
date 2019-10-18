import { Component, OnInit, ViewChild } from '@angular/core';
import { Bungalow, BungalowService } from '../../../services/bungalow.service';
import { AuthentificationService, User } from '../../../services/authentification.service';
import { NgForm } from '@angular/forms';
import { InterfaceService } from '../../../services/interface.service';
import { Router } from '@angular/router';
import { Events, IonSlides, LoadingController } from '@ionic/angular';
import { AdminService } from '../../../services/admin.service';



@Component({
	selector: 'app-respo',
	templateUrl: './respo.page.html',
	styleUrls: ['./respo.page.scss'],
})


export class RespoPage implements OnInit {

	@ViewChild('slides') slides: IonSlides;

	bungalow: Bungalow;
	loadingSpinner: any;
	user: User;
	respo = '';
	slideOpts = {
		allowTouchMove: false,
	};

	constructor(private _bungalow: BungalowService,
	            private _user: AuthentificationService,
	            private inter: InterfaceService,
	            private router: Router,
	            private event: Events,
	            private adminServ: AdminService,
	            private loadingCtrl: LoadingController) {}

	ngOnInit() {
		this.user = this._user.user;
		this._bungalow.getBungalow(this.user.bungalow).subscribe(
			bungalow => {
				this.bungalow = bungalow;
			}
		);
	}
	next() {
		this.slides.slideNext();
	}
	erreur() {
		this.inter.alert(
			'Ne bouge pas !',
			'',
			'Ce groupe est-il vraiment incorrect ?',
			[{
				text: 'Non',
				role: 'cancel'
			}, {
				text: 'Oui',
				handler: () => {
					console.log('Groupe incorrect');
					this.adminServ.addBillet({
						id: 'groupe-bungalow_' + this.bungalow.numero,
						code: 'Anomalie groupe',
						details: 'Bungalow n°' + this.bungalow.numero,
						statut: 'Nouveau',
						utilisateur: this.user.name
					}).then(
						() => this.inter.alert(
							'Alerte envoyée',
							'',
							'Le BDE a été prévenu, nous sommes désolés de cette erreur',
							[{
								text: 'OK',
								handler: () => {
									this.router.navigateByUrl('/');
								}
							}])
					).catch(
						(err) => {
							if (err === 'already-exists') {
								this.inter.alert(
									'Déjà fait !',
									'',
									'Le BDE a déjà été prévenu, nous viendrons bientôt vers toi :)',
									[{
										text: 'OK',
										handler: () => {
											this.router.navigateByUrl('/');
										}
									}]
								);
							}
						}
					);
				}
			}]
		);
	}
	async loading(msg: string) {
		this.loadingSpinner = await this.loadingCtrl.create({
			message: msg,
			spinner: "crescent",
			translucent: true
		});
		this.loadingSpinner.present();
	}

	defResp(r: NgForm) {
		console.log('Responsable : ' + r.value.respo);
		this.loading("Chargement en cours...");
		this._bungalow.defResp(this.bungalow.numero, r.value.respo).then(
			() => {
				this.event.publish('bungalow:respo', r.value.respo);
				this.event.publish('bungalow:FormRempli');
				this.inter.showToast('Responsable défini !');
				this.respo = r.value.respo;
				this.loadingSpinner.dismiss();
				this.slides.slideNext();
			},
			() => {
				this.loadingSpinner.dismiss();
				this.inter.showToast('Erreur lors de la définition.');
			}
		);
	}
}
