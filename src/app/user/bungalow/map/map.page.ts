import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Bungalow, BungalowService } from '../../../services/bungalow.service';
import { AuthentificationService } from '../../../services/authentification.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
	selector: 'app-map',
	templateUrl: './map.page.html',
	styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

	bungalow: Observable < Bungalow > ;
	loading: boolean;
	map: L.map;
	corner3 = L.latLng(0, 0);
	corner4 = L.latLng(1002, 1357);
	bounds2 = L.latLngBounds(this.corner3, this.corner4);
	corner1 = L.latLng(1002, 0);
	corner2 = L.latLng(0, 1357);
	bounds = L.latLngBounds(this.corner1, this.corner2);

	// positions = [];
	maps = ['assets/img/map/camping.png', 'assets/img/map/camping_vierge.png'];
	overlay = 'assets/img/map/camping_vierge.png';
	fond = L.imageOverlay(this.overlay, this.bounds2);
	icone = L.icon({
		iconUrl: 'assets/img/map/marker.png',
		iconSize: [64, 64],
		iconAnchor: [32, 64] // calcul du décalage créé par l'image de l'icône
	});

	constructor(private bungalowService: BungalowService,
	            private auth: AuthentificationService) {
		this.loading = true;
	}

	ngOnInit() {
		/*
		    1 ----------------- 4
		    |                   |
		    |                   |
		    3 ----------------- 2
		 */

		const showInfo = L.Control.extend({
			options: { position: 'topleft' },
			onAdd(map) {
				const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
				container.style.backgroundColor = 'white';
				container.style.width = '35px';
				container.style.height = '35px';
				container.innerHTML = '<a>' +
					'<ion-icon class="icon-only" name="information-circle-outline" ' +
					'style="font-size: 24px; padding-top: 3px"></ion-icon>' +
					'</a>'
				return container;
			},
		});

		this.map = L.map('camping', {
			crs: L.CRS.Simple,
			maxZoom: 1,
			minZoom: -1.2,
			zoomControl: true,
			zoomSnap: 1,
			scrollWheelZoom: true,
			touchZoom: true,
			doubleClickZoom: true,
			dragging: true,
			maxBounds: this.bounds
		});
		this.map.addControl(new showInfo());
		$('.leaflet-control-custom').click(() => this.changeMap());
		this.fond.addTo(this.map);
		this.map.fitBounds(this.bounds2);
		this.bungalowService.getBungalow(this.auth.user.bungalow).subscribe(
			b => {
				console.log('[MAP] Bungalow téléchargé:', b);
				this.loading = false;
				this.map.setView(b.emplacement, 1);
				L.marker(b.emplacement, { icon: this.icone }).addTo(this.map);
			},
			e => console.log(e)
		);
		/* A utiliser pour placer les bungalows :-)
		let i = 1;
		this.map.on('click', (e) => {
		    this.positions.push({numero: i, position: e.latlng});
		    console.log('Bungalow ' + i + 'placé !');
		    console.log(this.positions);
		    setTimeout(() => i++, 200);
		});*/
	}
	changeMap() {
		this.map.removeLayer(this.fond);
		this.overlay = this.maps[(this.maps.indexOf(this.overlay) + 1) % 2];

		this.fond = L.imageOverlay(this.overlay, this.bounds2);
		this.fond.addTo(this.map);
	}
}
