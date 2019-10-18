import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';

import {environment} from '../environments/environment.prod';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ApplicationComponent } from './application/application.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatStepperModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatMenuModule, MatRadioModule,
  MatSnackBarModule, MatExpansionModule

} from '@angular/material';

import {NavbarService} from './services/navbar.service';
import {BungalowService} from './services/bungalow.service';
import { UpdateAccountComponent } from './application/update-account/update-account.component';
import { UpdateBungalowComponent } from './application/update-bungalow/update-bungalow.component';
import { HelpComponent } from './application/help/help.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PolicyComponent } from './policy/policy.component';
import { InscriptionComponent } from './admin/inscription/inscription.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ApplicationComponent,
    UpdateAccountComponent,
    UpdateBungalowComponent,
    HelpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PolicyComponent,
    InscriptionComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatSnackBarModule,
    MatRadioModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    NavbarService,
    BungalowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
