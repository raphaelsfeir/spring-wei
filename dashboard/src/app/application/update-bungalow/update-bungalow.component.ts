import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Bungalow, BungalowService} from '../../services/bungalow.service';
import {AuthService, User} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar, MatStepper} from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-update-bungalow',
  templateUrl: './update-bungalow.component.html',
  styles: []
})
export class UpdateBungalowComponent implements OnInit {

  bungalow: Observable<Bungalow>;
  bungalows: Observable<Bungalow[]>;
  bungalowChoisi: Observable<Bungalow>;
  user: User;
  bungalowSelect = '0';
  selectResp = 'false';

  constructor(private _auth: AuthService,
              private _bungalow: BungalowService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this._auth.user;
    this.bungalow = this._bungalow.getBungalow(this.user.bungalow);
    this.bungalows = this._bungalow.bungalows;
    this.bungalowChoisi = this._bungalow.getBungalow(this.bungalowSelect);

    this.bungalow.subscribe(
      b => {
        console.log(this.user.bungalow);
        console.log(b.responsable);
      }
    );
  }

  /** Si l'utilisateur n'a pas de bungalow **/
  getStatus(locataires: string[], places: number){
    if (locataires.length === 0) {
      return 'list-group-item-success';
    } else if (locataires.length >= places) {
      return 'list-group-item-danger';
    }
  }
  filter(filtre?: string, interval?: number[]) {
    if (!filtre) { // Tout afficher
      $('.bungalow').each(function() {$(this).show(150); });
    } else {
      if (filtre === 'libres') {
        $('.bungalow').each(function() {$(this).show(150); });
        $('.list-group-item-danger').each(function() {$(this).hide(150); });
      } else if (filtre === 'places-4') {
        $('.bungalow').each(function() {$(this).hide(150); });
        $('.places-4').each(function() {$(this).show(150); });
        $('.list-group-item-danger').each(function() {$(this).hide(150); });
      } else if (filtre === 'places-6') {
        $('.bungalow').each(function() {$(this).hide(150); });
        $('.places-6').each(function() {$(this).show(150); });
        $('.list-group-item-danger').each(function() {$(this).hide(150); });
      } else if (filtre === 'places-8') {
        $('.bungalow').each(function() {$(this).hide(150); });
        $('.places-8').each(function() {$(this).show(150); });
        $('.list-group-item-danger').each(function() {$(this).hide(150); });
      } else if (filtre === 'groupe') {
        $('.bungalow').each(function() {$(this).hide(150); });
        for (let i = interval[0]; i < interval[1]; i++) {
          $('#bungalow_' + i).show(150);
        }
      }
    }
  }
  select(numero: string) {
    const bungalow = this._bungalow.getBungalow(numero);
    bungalow.subscribe(
      (b) => {
        if (b.locataires.length < b.places) {
          $('.bungalow').each(function(){$(this).removeClass('active');});
          $('#bungalow_' + numero).addClass('active');
          this.bungalowSelect = numero;
          this.bungalowChoisi = this._bungalow.getBungalow(this.bungalowSelect);
        } else {
          this.snackBar.open("Le bungalow est complet, impossible de le sélectionner.")._dismissAfter(950);
        }
      }
    );
  }
  chooseBungalow() {
    const numero = $('.active').attr('id').substring(9);
    this._bungalow.addLocataire(this.user.id, numero);
  }

  /** Si le responsable n'est pas défini **/
  setResp(form: NgForm) {
    const numero = this.user.bungalow;
    this._bungalow.setResp(numero, form.value.resp).then(
      () => {
        this.selectResp = form.value.resp;
        this.snackBar.open('Responsable défini !')._dismissAfter(1035);
      }
    ).catch(
      (code) => {
        alert(code);
      }
    );
  }

  refresh() {
    this.bungalow = this._bungalow.getBungalow(this.user.bungalow);
    this.bungalow.subscribe(
      (b) => {
        if (b.responsable === 'false'){
          this.snackBar.open("ERREUR : Aucun responsable n'a été défini !")._dismissAfter(4200);
        }
      }
    )
  }

}
