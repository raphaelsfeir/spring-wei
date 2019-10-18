import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthentificationService, User } from '../../services/authentification.service';
import { AdminService } from '../../services/admin.service';
import { InterfaceService } from '../../services/interface.service';
import {Subject, Subscription} from 'rxjs';

@Component({
	selector: 'app-bureau',
	templateUrl: './bureau.page.html',
	styleUrls: ['./bureau.page.scss'],
})
export class BureauPage implements OnDestroy{

	user: User;
	mapAccess: boolean;
	actuAccess: boolean;
	activiteAccess: boolean;
	challengeAccess: boolean;
	loading: boolean;
	parametres: Subscription;

	constructor(private _auth: AuthentificationService, private _admin: AdminService, private _inter: InterfaceService) {
		this.loading = true;
	}

	ionViewWillEnter() {
		this.user = this._auth.user;
		this.parametres = this._admin.getGlobals().subscribe(g => {
			this.loading = false;
			this.mapAccess = g.mapAccess;
			this.actuAccess = g.actuAccess;
			this.activiteAccess = g.activiteAccess;
			this.challengeAccess = g.challengeAccess;
		});
	}

	change(key, value) {
		this._admin.editGlobals(key, value)
			.then(() => this._inter.showToast("Le paramètre a été modifié"))
			.catch(() => this._inter.showToast("ERREUR, le paramètre n'a pas pu être modifié"));
	}

	ngOnDestroy() {
		console.log('[ADMIN] Unsubscribe from Globals');
		this.parametres.unsubscribe();
	}

}
