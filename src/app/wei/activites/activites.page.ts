import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthentificationService, User} from '../../services/authentification.service';
import {SwipeTabDirective} from '../../directives/swipe-tab.directive';
import {IonTabs} from '@ionic/angular';
import {AdminService} from '../../services/admin.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.page.html',
  styleUrls: ['./activites.page.scss'],
})

export class ActivitesPage implements OnInit {
	@ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;
	@ViewChild('tabs') tabRef: IonTabs;
	user: User;
	access: boolean;

	constructor(private auth: AuthentificationService,
	            private _admin: AdminService) { }

	ionTabsDidChange($event) {
		this.swipeTabDirective.onTabInitialized($event.tab);
	}

	onTabChange($event) {
		this.tabRef.select($event);
	}

	ngOnInit() {
		this._admin.globals.pipe(take(1)).subscribe(g => this.access = g.activiteAccess);
		this.user = this.auth.user;
	}
}
