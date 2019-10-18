import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  error = '';
  success = '';
  loading = false;

  constructor(private _auth: AuthService,
              private router: Router,
              private nav: NavbarService,
              public _sys: SystemService) { }

  ngOnInit() {
    this.nav.visible = false;
  }

  resetPass(form: NgForm) {
    $('#authFormulaire').slideUp(350);
    this.loading = true;
    this._auth.resetPassword(form.value.email).then(
      () => {
        this.loading = false;
        this.error = '';
        $('.alert-success').show(350);
        this.success = "Un mail de réinitialisation a été envoyé à ton adresse mail !"
      }
    ).catch(
      err => {
        this.loading = false;
        this.success = '';
        $('#authFormulaire').show(350);
        switch (err.code) {
          case 'auth/invalid-email':
            this.error = "L'adresse mail est incorrecte.";
            break;
          case 'auth/user-not-found':
            this.error = "L'adresse mail est introuvable. Es-tu bien inscrit au weekend ?";
            break;
          case 'auth/argument-error':
            this.error = "L'adresse mail est incorrecte.";
            break;
          default:
            this.error = "L'adresse mail est incorrecte.";
        }
      }
    );
  }

}
