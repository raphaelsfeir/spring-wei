import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
	selector: 'app-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

	gallery: any[];

	constructor(public app: AppComponent) {}

	ngOnInit() {
		this.gallery = this.app.appPages;
	}

}
