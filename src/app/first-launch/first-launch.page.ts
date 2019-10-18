import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthentificationService, User } from '../services/authentification.service';
import { InterfaceService } from '../services/interface.service';
import { Router } from '@angular/router';
import { SystemService } from '../services/system.service';

@Component({
	selector: 'app-first-launch',
	templateUrl: './first-launch.page.html',
	styleUrls: ['./first-launch.page.scss'],
})
export class FirstLaunchPage implements OnInit {

	@ViewChild('slides') slides: IonSlides;

	slideOpts = {
		allowTouchMove: true,
	};
	user: User;

	constructor(private _user: AuthentificationService,
	            private inter: InterfaceService,
	            private router: Router,
	            public _sys: SystemService) {}

	ngOnInit() {
		this.user = this._user.user;
	}
	next() {
		this.slides.slideNext();
	}
	ignore() {
		this._user.validLaunch();
		this.router.navigateByUrl('/');
	}

	continue () {
		this.ignore();
	}
}
