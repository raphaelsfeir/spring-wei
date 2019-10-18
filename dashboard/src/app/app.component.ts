import {Component, OnInit} from '@angular/core';
import {AuthService, User} from './services/auth.service';
import {NavbarService} from './services/navbar.service';
import {SystemService} from './services/system.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
  title = 'bungalow';
  user: User;
  constructor(private _auth: AuthService,
              public nav: NavbarService,
              public _sys: SystemService) {
    this.user = this._auth.user;
  }

  ngOnInit(): void {

  }

  logout() {
    this._auth.logout();
  }
}
