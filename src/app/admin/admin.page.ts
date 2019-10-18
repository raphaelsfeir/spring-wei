import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService, Billet } from '../services/admin.service';
import { Observable } from 'rxjs';
import { AuthentificationService, User } from '../services/authentification.service';
import { SwipeTabDirective } from '../directives/swipe-tab.directive';
import { IonTabs } from '@ionic/angular';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
	@ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;
	@ViewChild('tabs') tabRef: IonTabs;

	billets: Observable < Billet[] > ;
	user: User;

	constructor(private _admin: AdminService, private _auth: AuthentificationService) {}

	ionTabsDidChange($event) {
		this.swipeTabDirective.onTabInitialized($event.tab);
	}

	onTabChange($event) {
		this.tabRef.select($event);
	}

	ngOnInit() {
		this.billets = this._admin.getNewBillets();
		this.user = this._auth.user;
	}

}
