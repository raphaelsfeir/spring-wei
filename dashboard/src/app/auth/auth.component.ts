import { Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../services/navbar.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as $ from 'jquery';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {

  resultat= '';
  loading = false;

  constructor(private _auth: AuthService,
              private router: Router,
              private nav: NavbarService,
              private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nav.visible = false;
    this.loading = true;
    if (this.aRoute.snapshot.queryParamMap.get('mode') === 'resetPassword') {
      const code = this.aRoute.snapshot.queryParamMap.get('oobCode');
      this.router.navigateByUrl('/reset-password?oobCode=' + code);
    } else {
      this.loading = false;
    }
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (firebase.auth().currentUser){
          $('#authFormulaire').slideUp(350);
          this.loading = true;
          this._auth.initUser().then(
            () => {
              console.log('Je me souviens de toi !');
              this.router.navigateByUrl('/');
              this.loading = false;
            }
          );
        }
    });
  }

  login(form: NgForm) {
    $('#authFormulaire').slideUp(350);
    this.loading = true;
    this._auth.login(form.value.pseudo, form.value.pass, form.value.persistence).then(
      () => {
        this.resultat = '';
      }
    ).catch(
      (err) => {
        this.loading = false;
        $('#authFormulaire').show(350);
        if (err.code === 'auth/invalid-email')
          this.resultat = "Nom d'utilisateur incorrect !";
        else if(err.code === 'auth/wrong-password')
          this.resultat = "Mot de passe incorrect !";
        else
        this.resultat = "Les identifiants sont incorrects";
      }
    );
  }

}
