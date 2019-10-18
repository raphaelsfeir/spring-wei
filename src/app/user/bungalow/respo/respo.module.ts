import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {IonicModule} from '@ionic/angular';

import { RespoPage } from './respo.page';
import {SpringWeiModule} from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: RespoPage
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
  declarations: [RespoPage]
})
export class RespoPageModule {}
