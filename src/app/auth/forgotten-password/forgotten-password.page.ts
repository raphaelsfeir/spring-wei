import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
	selector: 'app-forgotten-password',
	templateUrl: './forgotten-password.page.html',
	styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

	validations_form: FormGroup;
	errorMessage: string = '';

	constructor(

		private navCtrl: NavController,
		private authService: AuthentificationService,
		private formBuilder: FormBuilder

	) {}

	ngOnInit() {

		this.validations_form = this.formBuilder.group({
			pseudo: new FormControl('', Validators.compose([
				Validators.required,
				Validators.pattern('^[a-z0-9_-]+\\.[a-z0-9_-]+$')
			]))
		});
	}


	validation_messages = {
		'pseudo': [
			{ type: 'required', message: 'Champ obligatoire.' },
			{ type: 'pattern', message: "Le nom d'utilisateur est ce qui se trouve avant '@insa-cvl.fr'" }
		]
	};


	resetPassword(value) {
		this.authService.resetPassword(value.pseudo);
	}

}
