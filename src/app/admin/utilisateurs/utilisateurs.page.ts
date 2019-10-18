import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { User } from '../../services/authentification.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-utilisateurs',
	templateUrl: './utilisateurs.page.html',
	styleUrls: ['./utilisateurs.page.scss'],
})
export class UtilisateursPage implements OnInit {

	userList: Observable < User[] > ;
	searchControl: FormControl;
	chargement: boolean;

	constructor(private _admin: AdminService) {
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.userList = this._admin.getUsers();

		this.setFilter('');
		this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(
			search => {
				this.chargement = false;
				this.setFilter(search);
			}
		);
	}

	enRecherche() {
		this.chargement = true;
	}

	setFilter(recherche) {
		this.userList = this._admin.filterUsers(recherche);
	}

	showInfos(userId: string) {
		this._admin.userInfo(userId);
	}

}
