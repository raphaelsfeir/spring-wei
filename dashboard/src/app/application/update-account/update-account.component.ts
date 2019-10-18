import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styles: []
})
export class UpdateAccountComponent implements OnInit {
  user: User;
  pass = '';
  passc = '';
  resultat = '';

  constructor(private _auth: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this._auth.user;
  }

  changePass(form: NgForm) {
    if (form.value.pass === form.value.passc && form.value.pass !== '' && form.value.passc !== ''){
      this._auth.changePassword(form.value.pass).then(
        () => {
          this.snackBar.open('Mot de passe mis à jour !')._dismissAfter(900);
        }
      ).catch(
        (err) => {
          this.resultat = err;
        }
      )
    } else {
      alert('Les deux champs sont obligatoires.')
    }
  }

}
