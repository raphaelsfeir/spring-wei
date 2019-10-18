import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-header-back',
	templateUrl: './header-back.component.html',
	styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent implements OnInit {

	@Input() titre;
	@Input() BackUrl;

	constructor(public renderer: Renderer2,
	            private el: ElementRef) {}

	ngOnInit() {}

}
