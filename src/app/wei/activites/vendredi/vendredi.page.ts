import { Component, OnInit } from '@angular/core';
import { Activite, ActivitesService } from '../../../services/activites.service';
import { Observable } from 'rxjs';
import { AuthentificationService, User } from '../../../services/authentification.service';

@Component({
	selector: 'app-vendredi',
	templateUrl: './vendredi.page.html',
	styleUrls: ['./vendredi.page.scss'],
})
export class VendrediPage implements OnInit {

	activites: Observable < Activite[] > ;
	user: User;

	constructor(private acti: ActivitesService, private auth: AuthentificationService) {}

	ngOnInit() {
		this.activites = this.acti.getActivites('vendredi');
		this.user = this.auth.user;
	}

}
