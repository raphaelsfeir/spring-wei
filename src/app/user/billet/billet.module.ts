import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BilletPage } from './billet.page';
import {SpringWeiModule} from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: BilletPage
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
  declarations: [BilletPage]
})
export class BilletPageModule {}
