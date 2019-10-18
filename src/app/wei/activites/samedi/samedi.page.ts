import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite, ActivitesService } from '../../../services/activites.service';
import { AuthentificationService, User } from '../../../services/authentification.service';

@Component({
	selector: 'app-samedi',
	templateUrl: './samedi.page.html',
	styleUrls: ['./samedi.page.scss'],
})
export class SamediPage implements OnInit {

	activites: Observable < Activite[] > ;
	user: User;

	constructor(private acti: ActivitesService, private auth: AuthentificationService) {}

	ngOnInit() {
		this.activites = this.acti.getActivites('samedi');
		this.user = this.auth.user;
	}

}
