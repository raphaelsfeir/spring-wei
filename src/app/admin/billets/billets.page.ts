import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService, Billet } from '../../services/admin.service';

@Component({
	selector: 'app-billets',
	templateUrl: './billets.page.html',
	styleUrls: ['./billets.page.scss'],
})
export class BilletsPage implements OnInit {

	billets: Observable < Billet[] > ;

	constructor(private _admin: AdminService) {}

	ngOnInit() {
		this.billets = this._admin.getBillets();
	}

	showInfos(billetId: string) {
		this._admin.billetInfo(billetId);
	}

}
