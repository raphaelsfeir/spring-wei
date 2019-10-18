import { Component, OnInit } from '@angular/core';
import { AuthentificationService, User } from '../services/authentification.service';
import { Defi, OlympiadesService } from '../services/olympiades.service';
import { Observable } from 'rxjs';
import { InterfaceService } from '../services/interface.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-olympiades',
	templateUrl: './olympiades.page.html',
	styleUrls: ['./olympiades.page.scss'],
})
export class OlympiadesPage implements OnInit {

	user: User;
	defis: Observable < Defi[] > ;
	access: boolean;

	constructor(private _auth: AuthentificationService,
	            private olympiades: OlympiadesService,
	            private router: Router,
	            private interfaceService: InterfaceService,
	            private _admin: AdminService) {}

	ngOnInit() {
		this.user = this._auth.user;
		this._admin.globals.pipe(take(1)).subscribe(g => {
			this.access = g.challengeAccess;
			this.defis = this.olympiades.getDefis();
		});
	}

	deleteDefi(id: string) {
		this.olympiades.deleteDefi(id).then(
			() => {
				this.router.navigateByUrl('/olympiades');
				this.interfaceService.showToast("Defi supprimé");
			}, err => {
				this.interfaceService.showToast("Erreur lors de la suppression");
			}
		);
	}

}
