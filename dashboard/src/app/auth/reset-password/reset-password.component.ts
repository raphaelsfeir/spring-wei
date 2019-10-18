import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  error = '';
  success = '';
  loading = false;
  code: string;

  constructor(private _auth: AuthService,
              private router: Router,
              private nav: NavbarService,
              private activatedRoute: ActivatedRoute,
              public _sys: SystemService) { }

  ngOnInit() {
    this.nav.visible = false;
    this.code = this.activatedRoute.snapshot.queryParamMap.get('oobCode');
    this.loading = true;
    $('#authFormulaire').hide();
    this._auth.checkCode(this.code).then(
      () => {
        this.loading = false;
        $('#authFormulaire').show(350);
      }
    ).catch(
      (msg) => {
        this.loading = false;
        this.error = msg;
      }
    );
  }

  resetPass(form: NgForm) {
    $('#authFormulaire').slideUp(350);
    this.loading = true;
    if (form.value.pass !== form.value.passc) {
      this.loading = false;
      this.error = 'Les deux mots de passes sont différents !';
      $('#authFormulaire').show(350);
    } else {
      this._auth.confirmResetPassword(this.code, form.value.pass).then(
        () => {
          this.loading = false;
          this.error = '';
          this.success = 'Le mot de passe a bien été modifié ! Tu peux désormais te connecter !';
        }
      ).catch((msg) => {
        this.loading = false;
        $('#authFormulaire').show(350);
        this.error = msg;
      })
    }
  }

}
