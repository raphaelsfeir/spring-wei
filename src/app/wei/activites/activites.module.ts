import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivitesPage } from './activites.page';
import {SpringWeiModule} from '../../components/components.module';
import {DirectivesModule} from '../../directives/directives.module';

const routes: Routes = [
	{
		path: 'tabs',
		component: ActivitesPage,
		children: [
			{
				path: 'vendredi',
				loadChildren: './vendredi/vendredi.module#VendrediPageModule'
			},
			{
				path: 'samedi',
				loadChildren: './samedi/samedi.module#SamediPageModule'
			},
			{
				path: 'dimanche',
				loadChildren: './dimanche/dimanche.module#DimanchePageModule'
			}
		]
	},{
		path: '',
		redirectTo: 'tabs/vendredi',
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
	declarations: [ActivitesPage]
})
export class ActivitesPageModule {}
