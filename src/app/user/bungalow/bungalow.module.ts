import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BungalowPage } from './bungalow.page';
import {SpringWeiModule} from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: BungalowPage
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
  declarations: [BungalowPage]
})
export class BungalowPageModule {}
