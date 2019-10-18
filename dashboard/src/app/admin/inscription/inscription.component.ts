import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styles: []
})
export class InscriptionComponent implements OnInit {

  constructor(public _auth: AuthService) {
      if (this._auth.user.type !== 'étudiant') {
        window.location.replace('https://raphaelsfeir.com/BDE_inscription_2019_bfa6f58fa97/');
      }
  }

  ngOnInit() {

  }


}
