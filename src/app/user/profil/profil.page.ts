import { Component, OnInit } from '@angular/core';
import {AuthentificationService, User} from '../../services/authentification.service';
import {InterfaceService} from '../../services/interface.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-profil',
	templateUrl: './profil.page.html',
	styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

	user: User;

	constructor(private _auth: AuthentificationService, private _inter: InterfaceService, private _router: Router) {}

	ngOnInit() {
		this.user = this._auth.user;
	}

	openBillet() {
		return new Promise((resolve, reject) => {
			this._inter.alert('Es-tu sûr ?', '', 'Cette section est à prendre avec sérieux',
				[{
						text: 'Annuler',
						role: 'cancel',
						handler: () => {
							console.log('Annulée');
							reject();
						}
					}, {
						text: 'Sûr',
						handler: () => {
							this._router.navigateByUrl('/user/billet');
							resolve();
						}
					}
				]);
		});
	}

}
