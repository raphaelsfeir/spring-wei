import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthentificationService, User} from '../../services/authentification.service';
import {Storage} from '@ionic/storage';
import {stringify} from 'querystring';
import {AppComponent} from '../../app.component';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {skip} from 'rxjs/operators';
import {InterfaceService} from '../../services/interface.service';
import {SystemService} from '../../services/system.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	validations_form: FormGroup;
	remember: boolean;
	username: string;
	password: string;
	checkMem = {rememberMe: null as boolean, user: null as User};

	open: string;
	validation_messages = {
		'pseudo': [
			{ type: 'pattern', message: "Le nom d'utilisateur est la forme prenom.nom"},
			{ type: 'required', message: 'Ce champ est obligatoire.' },
		],
		'password': [
			{ type: 'required', message: 'Ce champ est obligatoire.' },
		]
	};

	constructor(
		private navCtrl: NavController,
		private authService: AuthentificationService,
		private formBuilder: FormBuilder,
		private storage: Storage,
		private app: AppComponent,
		private activatedRoute: ActivatedRoute,
		private inter: InterfaceService,
		private _sys: SystemService
	) {
		this.validations_form = this.formBuilder.group({
			pseudo: new FormControl('', Validators.compose([
				Validators.pattern('^[a-z0-9_-]+\\.[a-z0-9_-]+$'),
				Validators.required
			])),
			password: new FormControl('', Validators.compose([
				Validators.required
			])),
			rememberMe: new FormControl(false)
		});
		this.open = this.activatedRoute.snapshot.queryParamMap.get('open');
		console.log(this.open);
		this._sys.getMem('rememberMe').then(b => {
			console.log('[STORAGE] Champ rememberMe trouvé !');
			this.checkMem.rememberMe = !!b;
			this._sys.getMem('user').then(u => {
				console.log('[STORAGE] Champ user trouvé !');
				this.checkMem.user = u;
				if (this.checkMem.rememberMe && this.checkMem.user) {
					this.remember = true;
					console.log('[STORAGE] L\'application se souvient de toi !');
					this.authService.login(this.checkMem, this.open, true).then(
						() => {
							this.app.user = this.authService.user;
						}
					);
				} else {
					this.remember = false;
					console.log('[STORAGE] Utilisateur inconnu');
				}
			}).catch(() => {
				console.log('[STORAGE] Champ user introuvable !');
				this.remember = false;
			});
		}).catch(() => {
			console.log('[STORAGE] Champ rememberMe introuvable !');
			this.remember = false;
		});
	}

	ngOnInit() {}


	loginUser(value) {
		if (this.validations_form.valid) {
			this.authService.login(value, this.open).then(
				() => {
					this.app.user = this.authService.user;
				}
			);
		} else {
			this.inter.alert(
				'Erreur',
				'',
				'Les deux champs sont obligatoires !',
				[{
					text: 'OK'
				}]
			);
		}
	}

	help() {
		this.inter.alert(
			'Aide',
			'',
			'Tes identifiants t\'ont été envoyés par mail lors de ton inscription au SpringWEI',
			[
				{
					text: 'Plus d\'aide',
					handler: () => {
						this._sys.goTo(this._sys.DASHBOARD_LINK + '/help');
					}
				},{
					text: 'C\'est bon !'
				}
			]
		);
	}

}
