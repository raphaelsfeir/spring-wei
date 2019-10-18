import { Component, OnInit } from '@angular/core';
import { AuthentificationService, User } from '../../services/authentification.service';
import { Bungalow, BungalowService } from '../../services/bungalow.service';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { SystemService } from '../../services/system.service';
import { InterfaceService } from '../../services/interface.service';
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-bungalow',
	templateUrl: './bungalow.page.html',
	styleUrls: ['./bungalow.page.scss'],
})
export class BungalowPage implements OnInit {

	user: User;
	bungalow: Bungalow;
	loading: boolean;

	constructor(private _auth: AuthentificationService,
	            private _bungalow: BungalowService,
	            private events: Events,
	            private router: Router,
	            private _sys: SystemService,
	            private inter: InterfaceService,
	            private _admin: AdminService) {
		this.loading = true;
	}

	ngOnInit() {
		this._auth.initUser().then(
			() => {
				this.user = this._auth.user;
				this._bungalow.getBungalow(this.user.bungalow).subscribe(
					bungalow => {
						console.log(this.user.bungalow);
						this.bungalow = bungalow;
						this.loading = false;
						if (this.bungalow.responsable === 'false' && this._auth.user.bungalow !== '0') {
							this.router.navigateByUrl('/user/bungalow/respo');

							this.events.subscribe('bungalow:respo', (respo) => {
								console.log('Responsable mis à jour ! ' + respo);
								this.bungalow.responsable = respo;
							});
						}
					}
				);

				this.events.subscribe('bungalow:FormRempli', () => {
					this.events.unsubscribe('bungalow:respo', () => {
						console.log('Unsubscribe de Respo');
					});
					this.events.unsubscribe('bungalow:FormRempli', () => {
						console.log('Unsubscribe du formulaire');
					});
				});
			}
		);
	}
	goTo(url: string) {
		this._sys.goTo(url);
	}
	verif() {
		this._admin.globals.pipe(take(1)).subscribe(g => {
			if (this.user.type !== 'admin' && !g.mapAccess) {
				this.inter.alert(
					'Raté !',
					'',
					"La carte n'est pas encore accessible... patience 😛",
					["Zut !"]
				);
			} else {
				this.router.navigateByUrl('/user/bungalow/map');
			}
		});
	}
}
