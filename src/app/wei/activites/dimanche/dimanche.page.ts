import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite, ActivitesService } from '../../../services/activites.service';
import { AuthentificationService, User } from '../../../services/authentification.service';

@Component({
	selector: 'app-dimanche',
	templateUrl: './dimanche.page.html',
	styleUrls: ['./dimanche.page.scss'],
})
export class DimanchePage implements OnInit {

	activites: Observable < Activite[] > ;
	user: User;

	constructor(private acti: ActivitesService, private auth: AuthentificationService) {}

	ngOnInit() {
		this.activites = this.acti.getActivites('dimanche');
		this.user = this.auth.user;
	}

}
