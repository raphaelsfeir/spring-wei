import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService, User} from '../services/auth.service';
import {NavbarService} from '../services/navbar.service';
import {Bungalow, BungalowService} from '../services/bungalow.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styles: []
})
export class ApplicationComponent implements OnInit, AfterViewInit {

  constructor(private _auth: AuthService, private nav: NavbarService,
              private _bungalow: BungalowService) {

  }
  user: User;
  bungalow: Observable<Bungalow>;

  ngOnInit() {
    this.user = this._auth.user;
    this.bungalow = this._bungalow.getBungalow(this.user.bungalow);
  }
  ngAfterViewInit() {
    this.nav.visible = true;
  }
  download(os: 'ios' | 'android') {
    switch (os) {
      case 'ios':
        break;
      case 'android':
        break;
    }
  }

}
