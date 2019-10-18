import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Activite, ActivitesService } from '../../../../services/activites.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

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
		this.activiteService.addActivite(jour, a).then(
			() => {
				this.router.navigateByUrl('/wei/activites');
				this.showToast('Activité créée');
			}, err => {
				this.showToast("Erreur lors de la création :( ");
			}
		);
	}
	deleteActivite(jour: string, id: string) {
		this.activiteService.deleteActivite(jour, id).then(
			() => {
				this.router.navigateByUrl('/wei/activites');
				this.showToast("Activité supprimée");
			}, err => {
				this.showToast("Erreur lors de la suppression");
			}
		);
	}
	updateActivite(jour: string, a: Activite) {
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
