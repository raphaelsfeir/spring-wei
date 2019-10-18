import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgottenPasswordPage } from './forgotten-password.page';
import {SpringWeiModule} from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      SpringWeiModule,
      ReactiveFormsModule
  ],
  declarations: [ForgottenPasswordPage]
})
export class ForgottenPasswordPageModule {}
