import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthentificationService } from '../../../services/authentification.service';
import { InterfaceService } from '../../../services/interface.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

	validations_form: FormGroup;
	errorMessage: string = '';

	constructor(

		private navCtrl: NavController,
		private authService: AuthentificationService,
		private formBuilder: FormBuilder,
		private interfaceService: InterfaceService

	) {}

	ngOnInit() {

		this.validations_form = this.formBuilder.group({
			password: new FormControl('', Validators.compose([
				Validators.required,
				Validators.minLength(5)
			])),
			password_confirm: new FormControl('', Validators.compose([
				Validators.required
			])),
		});
	}


	validation_messages = {
		'password': [
			{ type: 'required', message: 'Champ obligatoire.' },
			{ type: 'minlength', message: 'Le mot de passe doit comporter au moins 5 caractères.' },
		],
		'password_confirm': [
			{ type: 'required', message: 'Champ obligatoire.' },
		]
	};


	changePass(value) {
		if (value.password === value.password_confirm) {
			this.authService.editPassword(value.password)
				.then(res => {
					this.errorMessage = "";
					this.navCtrl.navigateForward('/user');
				}, err => {
					this.errorMessage = err.message;
				});
		} else {
			this.interfaceService.alert(
				"Erreur !",
				"",
				"Les deux mots de passe ne sont pas identiques !",
				["Réessayer"]
			);
		}
	}

}
