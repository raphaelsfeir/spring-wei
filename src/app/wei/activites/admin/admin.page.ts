import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Activite, ActivitesService } from '../../../services/activites.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

	jours = ['s\u00f8n', 's\u00f8n', 's\u00f8n', 's\u00f8n', 'Vendredi', 'Samedi', 'Dimanche'];

	activite: Activite = {
		titre: '',
		heure_debut: '',
		heure_fin: '',
		jour: '',
		description: ''
	};

	constructor(private activatedRoute: ActivatedRoute,
	            private activiteService: ActivitesService,
	            private toastCtrl: ToastController,
	            private router: Router) {}

	ngOnInit() {
		let jour = this.activatedRoute.snapshot.paramMap.get('jour');
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.activiteService.getActivite(jour, id).subscribe(activite => {
				this.activite = activite;
			});
		}
	}

	submit(f: NgForm) {
		this.activite = f.value;
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.activite.id = id;
			this.updateActivite(this.activite.jour, this.activite);
		} else {
			this.addActivite(this.activite.jour, this.activite);
		}
	}

	addActivite(jour: string, a: Activite) {
		const h_debut_tmp = new Date(a.heure_debut.toString());
		const h_fin_tmp = new Date(a.heure_fin.toString());
		a.heure_debut = ('0' + h_debut_tmp.getHours()).slice(-2) + ':' + ('0' + h_debut_tmp.getMinutes()).slice(-2);
		a.heure_fin = ('0' + h_fin_tmp.getHours()).slice(-2) + ':' + ('0' + h_fin_tmp.getMinutes()).slice(-2);
		this.activiteService.addActivite(jour, a).then(
			() => {
				this.router.navigateByUrl('/wei/activites');
				this.showToast('Activité créée');
			}, err => {
				this.showToast("Erreur lors de la création :( ");
			}
		);
	}
	updateActivite(jour: string, a: Activite) {
		const h_debut_tmp = new Date(a.heure_debut.toString());
		const h_fin_tmp = new Date(a.heure_fin.toString());
		a.heure_debut = h_debut_tmp.getHours() + ':' + h_debut_tmp.getMinutes();
		a.heure_fin = h_fin_tmp.getHours() + ':' + h_fin_tmp.getMinutes();

		this.activiteService.updateActivite(jour, a).then(
			() => {
				this.router.navigateByUrl('/wei/activites');
				this.showToast("Activité mise à jour");
			}, err => {
				this.showToast("Erreur lors de la modification");
			}
		);
	}
	showToast(msg) {
		this.toastCtrl.create({
			message: msg,
			duration: 2000
		}).then(toast => toast.present());
	}

}
