import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system.service';

@Component({
	selector: 'app-informations',
	templateUrl: './informations.page.html',
	styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {

	version = '';

	constructor(public _sys: SystemService) {}

	ngOnInit() {
		this._sys.getVersion().then(
			v => {
				this.version = v;
				console.log(this.version);
			}
		);
	}

}
