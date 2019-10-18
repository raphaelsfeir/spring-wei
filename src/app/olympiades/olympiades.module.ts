import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OlympiadesPage } from './olympiades.page';
import {SpringWeiModule} from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: OlympiadesPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      SpringWeiModule
  ],
  declarations: [OlympiadesPage]
})
export class OlympiadesPageModule {}
