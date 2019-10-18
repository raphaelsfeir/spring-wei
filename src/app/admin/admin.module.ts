import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import {SpringWeiModule} from '../components/components.module';
import {DirectivesModule} from '../directives/directives.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: AdminPage,
    children: [
      {
        path: 'billets',
        loadChildren: './billets/billets.module#BilletsPageModule'
      },
      {
        path: 'utilisateurs',
        loadChildren: './utilisateurs/utilisateurs.module#UtilisateursPageModule'
      },
      {
        path: 'bureau',
        loadChildren: './bureau/bureau.module#BureauPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/billets',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      SpringWeiModule,
	  DirectivesModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
