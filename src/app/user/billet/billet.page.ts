import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AuthentificationService, User} from '../../services/authentification.service';
import {InterfaceService} from '../../services/interface.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-billet',
  templateUrl: './billet.page.html',
  styleUrls: ['./billet.page.scss'],
})
export class BilletPage implements OnInit {
	user: User;

  constructor(private _admin: AdminService, private _auth: AuthentificationService, private _inter: InterfaceService, private _router: Router) { }

  ngOnInit() {
  	this.user = this._auth.user;
  }

  submit(form) {
	if (form.value.problem) {
		this._admin.addBillet({
			id: 'perso_' + this.user.pseudo,
			code: 'perso',
			details: form.value.problem,
			statut: 'nouveau',
			utilisateur: this.user.name
		}).then(() => {
			this._inter.showToast('Le BDE a bien été informé, merci !');
			this._router.navigateByUrl('/user');
		}).catch((err) => {
			if (err === 'already-exists') {
				this._inter.showToast('Le problème a déjà été signalé !');
				this._router.navigateByUrl('/user');
			}
		});
	}
  }

}
