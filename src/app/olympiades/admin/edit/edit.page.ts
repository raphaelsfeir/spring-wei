import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Defi, Famille, OlympiadesService } from '../../../services/olympiades.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { InterfaceService } from '../../../services/interface.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

	defi: Defi = {
		titre: '',
		points: 0,
		validation: []
	};
	familles: Observable < Famille[] > ;

	constructor(private activatedRoute: ActivatedRoute,
	            private olympiades: OlympiadesService,
	            private toastCtrl: ToastController,
	            private interfaceService: InterfaceService,
	            private router: Router,
	            public renderer: Renderer2,
	            private el: ElementRef) {}

	ngOnInit() {
		this.renderer.removeClass(this.el.nativeElement, 'ion-page-invisible');
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.olympiades.getDefi(id).subscribe(defi => {
				this.defi = defi;
			});
		}
		this.familles = this.olympiades.getFamilles();
	}

	valide(f: string, d: Defi) {
		return this.olympiades.valide(f, d);
	}

	submit(f: NgForm) {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		const validation = this.olympiades.initValidation(f);
		if (id) {
			this.updateDefi(f, id);
		} else {
			this.addDefi(f);
		}
	}

	addDefi(f: NgForm) {
		this.olympiades.addDefi(f).then(
			() => {
				this.router.navigateByUrl('/olympiades');
				this.interfaceService.showToast('Defi créé');
			}, err => {
				this.interfaceService.showToast("Erreur lors de la création :( ");
			}
		);
	}
	deleteDefi() {
		this.olympiades.deleteDefi(this.defi.id).then(
			() => {
				this.router.navigateByUrl('/olympiades');
				this.interfaceService.showToast("Defi supprimé");
			}, err => {
				this.interfaceService.showToast("Erreur lors de la suppression");
			}
		);
	}
	updateDefi(f: NgForm, id: string) {
		this.olympiades.updateDefi(f, id).then(
			() => {
				this.router.navigateByUrl('/olympiades');
				this.interfaceService.showToast("Defi mis à jour");
			}, err => {
				this.interfaceService.showToast("Erreur lors de la modification");
			}
		);
	}

}
