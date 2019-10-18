import { Component, OnInit, ViewChild } from '@angular/core';
import { Actu, ActuService } from '../../services/actu.service';
import { AuthentificationService, User } from '../../services/authentification.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { InterfaceService } from '../../services/interface.service';
import { SystemService } from '../../services/system.service';
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-actu',
	templateUrl: './actu.page.html',
	styleUrls: ['./actu.page.scss'],
})
export class ActuPage {

	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

	actus: Actu[];
	user: User;
	loading = true;
	loadingMore = false;
	access: boolean;
	finish = false;

	constructor(private actuService: ActuService,
	            private _auth: AuthentificationService,
	            private inter: InterfaceService,
	            public _sys: SystemService,
	            private _admin: AdminService) {}

	ionViewWillEnter() {
		this._admin.globals.pipe(take(1)).subscribe(g => {
			this.access = g.actuAccess;
			this.actuService.getActus().then(() => {
				this.actus = this.actuService.messages;
				this.loading = false;
			})
				.catch(() => {
					this.actus = [];
					this.loading = false;
				});
		});

		this.user = this._auth.user;
	}

	deleteActu(id: string) {
		this.actuService.deleteActu(id);
	}

	extrait(str: string) {
		let trimmed = str.substr(0, 60);
		if (trimmed.lastIndexOf(" ") > 0) {
			trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" "))) + '...';
		}
		return trimmed;
	}
	loadMore() {
		this.loadingMore = true;
		this.actuService.getMoreActus().then(() => {
			this.loadingMore = false;
			this.actus = this.actuService.messages;
		})
			.catch(msg => {
				if (msg === 'full') {
					this.loadingMore = false;
					this.finish = true;
				} else {
					this.loadingMore = false;
					this.finish = true;
					console.error(msg);
				}
			});
	}
	doRefresh(event) {
		this.actuService.getActus(true).then(() => {
			this.actus = this.actuService.messages;
			event.target.complete();
		});
	}
}
