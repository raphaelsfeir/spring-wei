import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {LoadingController} from '@ionic/angular';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {InterfaceService} from './interface.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm/ngx';
import {SystemService} from './system.service';

firebase.initializeApp(environment.firebase);

export interface User {
	id?: string;
	pseudo: string;
	name: string;
	type: string;
	bungalow: string;
	campus: string;
	appLaunch: boolean;
}

@Injectable()
export class AuthentificationService {
	loadingSpinner: any;

	users: Observable < User[] > ;
	private usersCollection: AngularFirestoreCollection < User > ;

	user$: Observable < User > ;
	user: User;

	constructor(private loadingCtrl: LoadingController,
	            private interfaceService: InterfaceService,
	            private afs: AngularFirestore,
	            private router: Router,
	            private storage: Storage,
	            private fcm: FCM,
	            private _sys: SystemService) {
		this.usersCollection = afs.collection < User > (
			'users',
			ref => ref.orderBy('name')
		);
		this.users = this.usersCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return {
						id,
						...data
					};
				});
			})
		);
	}

	async loading(msg: string) {
		this.loadingSpinner = await this.loadingCtrl.create({
			message: msg,
			spinner: 'crescent',
			translucent: true
		});
		this.loadingSpinner.present();
	}



	login(value, redirect? , remember?: boolean) {
		if (remember) {
			console.log('[AUTH - STORAGE] Utilisateur enregistré, recherche dans le stockage');
			return new Promise(res => {
				this._sys.checkToken().then(() => {
					console.log('[AUTH - STORAGE] Token correct');
					this._sys.getMem('user').then(u => {
						console.log('[AUTH - STORAGE] Utilisateur trouvé dans le stockage', u);
						this.user = u;
						this.interfaceService.showToast('Salut ' + this.user.name + ' !');
						if (redirect) {
							this.router.navigateByUrl('/' + redirect);
						} else {
							this.router.navigateByUrl('/');
						}
						res();
					});
				})
					.catch(() => {
						console.log('[STORAGE] Token incorrect');
						this.router.navigateByUrl('/auth/login');
					});
			});
		} else {
			let email: string;
			value.pseudo = value.pseudo.toLowerCase().replace(/@insa-cvl.fr/g, '');
			email = value.pseudo + '@insa-cvl.fr';
			console.log('[AUTH] Connexion de ', email);
			this.loading('Connexion en cours...');
			return new Promise < any > ((resolve, reject) => {
				firebase.auth().signInWithEmailAndPassword(email, value.password)
					.then(
						res => {
							console.log('[AUTH] Connexion réussie');
							this.initUser().then(
								() => {
									this.interfaceService.showToast('Salut ' + this.user.name + ' !');
									if (!!value.rememberMe) {
										console.log('[AUTH] Stockage de l\'utilisateur en local');
										this._sys.setMem(this.user);
									} else {
										this._sys.cleanMem();
										console.log('Données supprimées');
									}

									/* NOTIFICATIONS */
									this.fcm.subscribeToTopic('defis');
									this.fcm.subscribeToTopic('actualites');
									this.fcm.subscribeToTopic('activites');
									if (this.user.type !== 'étudiant') {
										this.fcm.subscribeToTopic('admin');
										if (this.user.type === 'admin' || this.user.type === 'communication') {
											this.fcm.subscribeToTopic('updatesActualites');
											this.fcm.subscribeToTopic('updatesActivites');
										} else if (this.user.type === 'animation') {
											this.fcm.subscribeToTopic('updatesDefis');
										}
									}
									this.loadingSpinner.dismiss();
									if (!this.user.appLaunch) {
										this.router.navigateByUrl('/first-launch');
									} else {
										if (redirect) {
											this.router.navigateByUrl('/' + redirect);
										} else {
											this.router.navigateByUrl('/');
										}
									}
									resolve(res);
								}
							)
								.catch(() => {
									console.log('[AUTH] Erreur lors de l\'initialisation');
									this.loadingSpinner.dismiss();
									alert('Erreur lors de l\'initialisation');
								});
						},
						err => {
							console.log('[AUTH] Erreur lors de la connexion');
							this.loadingSpinner.dismiss();
							if (err.code === 'auth/user-not-found') {
								this.interfaceService.alert('Erreur !',
									'',
									'Les identifiants sont incorrects !',
									['Réessayer']);
							} else if (err.code === 'auth/wrong-password') {
								this.interfaceService.alert('Erreur !',
									'',
									'Les identifiants sont incorrects !',
									['Réessayer']);
							} else if (err.code === 'auth/user-disabled') {
								this.interfaceService.alert('Erreur !',
									'',
									'Cet utilisateur a été suspendu. Parles-en avec le BDE.',
									['Réessayer']);
							} else { // Autre erreur
								alert(err);
							}
							reject();
						}
					);
			});
		}
	}
	logout() {
		return new Promise(
			(resolve, reject) => {
				this.interfaceService.alert(
					'Déconnexion',
					'',
					'Souhaites-tu vraiment te déconnecter ?',
					[{
						text: 'Annuler',
						role: 'cancel',
						handler: () => {
							console.log('Déconnexion annulée');
							reject();
						}
					}, {
						text: 'Se déconnecter',
						handler: () => {
							return new Promise((resolveD, rejectD) => {
								if (firebase.auth().currentUser) {
									firebase.auth().signOut()
										.then(
											res => {
												this._sys.cleanMem();
												resolve();
												resolveD();
											},
											error => {
												rejectD(error);
											}
										);
								}
							});
						}
					}]
				);
			}
		);
	}

	getUser(id: string): Observable<User> {
		console.log('[AUTH] Téléchargement des données de l\'utilisateur: ', id);
		return this.usersCollection.doc<User>(id).valueChanges().pipe(
			take(1),
			map(user => {
				console.log('[AUTH] Utilisateur téléchargé: ', user);
				user.id = id;
				return user;
			})
		);
	}

	getUsersList(): Observable < User[] > {
		return this.users;
	}

	initUser() {
		console.log('[AUTH] Initialisation de l\'utilisateur');
		const id = firebase.auth().currentUser.uid;
		if (id) {
			console.log('[AUTH] Identifiant Firebase correct');
			return new Promise((resolve) => {
				this.getUser(id).subscribe(user => {
					this.user = user;
					console.log('[AUTH] Utilisateur enregistré');
					this._sys.getMem('rememberMe').then(b => {
						if (b) {
							console.log('[AUTH - STORAGE] L\'utilisateur a déjà été enregistré localement');
							this._sys.getMem('user').then(u => {
								console.log('[AUTH - STORAGE] Utilisateur enregistré : ', u);
								if (this.user.bungalow !== u.bungalow) {
									this._sys.updateMem('user', this.user);
									console.log('[AUTH - STORAGE] Bungalow différent, mise à jour : ', u);
									resolve();
								} else {
									console.log('[AUTH - STORAGE] L\'utilisateur enregistré n\'est pas différent de la dernère version');
									resolve();
								}
							});
						} else {
							console.log('[AUTH - STORAGE] Erreur lors la récupération locale');
							resolve();
						}
					})
						.catch(() => {
							console.log('[AUTH - STORAGE] Le champ n\'existe pas');
							resolve();
						});
				});
			});
		} else {
			console.log('[AUTH] Identifiant Firebase incorrect');
		}
	}

	editPassword(pass: string): Promise < void > {
		this.loading('Vérification en cours...');
		return new Promise((resolve, reject) => {
			if (firebase.auth().currentUser) {
				firebase.auth().currentUser.updatePassword(pass).then(
					res => {
						this.loadingSpinner.dismiss();
						resolve();
					},
					error => {
						reject(error);
					}
				);
			}
		});
	}

	resetPassword(pseudo: string) {
		pseudo = pseudo.toLowerCase().replace(/@insa-cvl.fr/g, '');
		const email = pseudo + '@insa-cvl.fr';
		console.log(email);
		this.loading('Vérification en cours...');
		firebase.auth().sendPasswordResetEmail(email)
			.then(() => {
				this.loadingSpinner.dismiss();
				this.interfaceService.alert('Email envoyé !',
					'',
					'Le mail de réinitialisation a été envoyé à ton adresse mail INSA : ' + email,
					['OK']);
				this.router.navigateByUrl('/auth');
			})
			.catch((error) => {
				if (error.code === 'auth/user-not-found') {
					this.loadingSpinner.dismiss();
					this.interfaceService.alert('Erreur !',
						'',
						'Le nom d\'utilisateur est introuvable.',
						['OK']);
				} else if (error.code === 'auth/too-many-requests') {
					this.loadingSpinner.dismiss();
					this.interfaceService.alert('Calme toi !',
						'',
						'Tu as déjà effectué beaucoup de demandes. Tu as été bloqué temporairement. Réessaie <strong>plus tard</strong>.',
						['OK']);
				}

				console.log(error);
			});
	}

	validLaunch() {
		this.usersCollection.doc(this.user.id).update({
			appLaunch: true
		}).then(
			() => this.initUser()
		);
	}

}
