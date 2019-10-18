import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationComponent} from './application/application.component';
import {canActivate} from '@angular/fire/auth-guard';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthComponent} from './auth/auth.component';
import {UpdateAccountComponent} from './application/update-account/update-account.component';
import {UpdateBungalowComponent} from './application/update-bungalow/update-bungalow.component';
import {HelpComponent} from './application/help/help.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {PolicyComponent} from './policy/policy.component';
import {AdminComponent} from './admin/admin.component';
import {InscriptionComponent} from './admin/inscription/inscription.component';


const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'auth',
    component: AuthComponent
  }, {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent
  },  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'update-account',
    component: UpdateAccountComponent,
    canActivate: [AuthGuardService]
  },{
    path: 'update-bungalow',
    component: UpdateBungalowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/inscription',
    component: InscriptionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
